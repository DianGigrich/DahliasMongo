const { Schema, model } = require('mongoose');


const dahliaSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    primaryColor: {
        type: String,
        required: true,
        trimmed: true
    },
    secondaryColor: {
        type: String,
        required: false,
        trimmed: true
    },
    size: Number,
    have: Boolean,
    want: Boolean,
    img:
    {
        data: Buffer,
        contentType: String
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    }
});

const Dahlia = model('dahlia', dahliaSchema)

module.exports = Dahlia;