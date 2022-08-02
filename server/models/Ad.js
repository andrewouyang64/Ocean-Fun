const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const adSchema = new Schema({

    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true,
    },

    adText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true,
    },
    adAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    sportName: {
        type: Schema.Types.String,
        ref: 'Sport'
    },

    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
            commentAuthor: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],
},
);

const Ad = model('Ad', adSchema);

module.exports = Ad;

