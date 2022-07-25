const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({
    sport: {
        type: String,
        enum: ['Surfing', 'Kitesurfing', 'Scubadiving'],
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
        trim: true,
    },
    AdAuthor: {
        type: String,
        required: true,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comments',
        },
    ],
});

const Ad = model('Ad', thoughtSchema);

module.exports = Ad;