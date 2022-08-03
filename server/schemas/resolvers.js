const { AuthenticationError } = require('apollo-server-express');
const { Sport, User, Ad } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {

		// return all the users and their ads
		users: async () => {
			return User.find().populate('ads');
		},
		// return a specific user and all its ads
		user: async (parent, { username }) => {
			return User.findOne({ username }).populate('ads');
		},

		// Return all the sports with their ads
		sports: async () => {
			return Sport.find().populate('ads');
		},

		// Return a specific sport and all their ads
		sport: async (parent, { name }) => {
			return Sport.findOne({ name }).populate('ads');
			// sort({ createdAt: -1 });
		},


		ad: async (parent, { adId }) => {
			return Ad.findOne({ _id: adId });
		},
		me: async (parent, args, context) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id }).populate('ads');
			}
			throw new AuthenticationError('You need to be logged in!');
		}
	},

	Mutation: {
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('No user found with this email address');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);

			return { token, user };
		},
		addAd: async (parent, { sportName, title, adText, email, adAuthor }, context) => {
			if (context.user) {
				const ad = await Ad.create({
					sportName,
					title,
					adText,
					email,
					adAuthor

				});
				// await User.findOneAndUpdate(
				//   { _id: context.user._id },
				//   { $addToSet: { ads: ad._id } }
				// );
				await Sport.findOneAndUpdate(
					{ name: sportName },
					{
						$addToSet: {
							ads: ad._id
						}
					});
				return ad;
			}

			// throw new AuthenticationError('You need to be logged in!');
		},
		addComment: async (parent, { adId, commentText }, context) => {
			if (context.user) {
				return Ad.findOneAndUpdate(
					{ _id: adId },
					{
						$addToSet: {
							comments: { commentText, commentAuthor: context.user.username }
						}
					},
					{
						new: true,
						runValidators: true
					}
				);
			}
			throw new AuthenticationError('You need to be logged in!');
		}
		// removeThought: async (parent, { adId }, context) => {
		//   if (context.user) {
		//     const ad = await Thought.findOneAndDelete({
		//       _id: adId,
		//       adAuthor: context.user.username,
		//     });

		//     await User.findOneAndUpdate(
		//       { _id: context.user._id },
		//       { $pull: { ads: ad._id } }
		//     );

		//     return ad;
		//   }
		//   // throw new AuthenticationError('You need to be logged in!');
		// },
		// removeComment: async (parent, { adId, commentId }, context) => {
		//   if (context.user) {
		//     return Ad.findOneAndUpdate(
		//       { _id: adId },
		//       {
		//         $pull: {
		//           comments: {
		//             _id: commentId,
		//             commentAuthor: context.user.username,
		//           },
		//         },
		//       },
		//       { new: true }
		//     );
		//   }
		//   // throw new AuthenticationError('You need to be logged in!');
		// },
	}
};

module.exports = resolvers;
