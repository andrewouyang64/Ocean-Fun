const { AuthenticationError } = require('apollo-server-express');
const { User, Ad, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    ads: async () => {
      return Ad.find().populate('comments');
    },
    ad: async (parent, { adId }) => {
      return User.findOne({ adId }).populate('comments');
    },
    comments: async (parent, { adId }) => {
      const params = adId ? { adId } : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },    
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
    
    addComment: async (parent, { adId, commentText }, context) => {
      if (context.user) {
        return Ad.findOneAndUpdate(
          { _id: adId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
