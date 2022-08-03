const { Schema, model } = require('mongoose');

const sportSchema = new Schema({

	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 100,
		trim: true
	},

	ads: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Ad'
		}
	]
});

const Sport = model('Sport', sportSchema);

module.exports = Sport;
