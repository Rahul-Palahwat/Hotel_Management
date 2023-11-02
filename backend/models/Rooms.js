const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    Room_No: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    }
})

const rooms = mongoose.model('rooms', roomSchema);

module.exports = rooms;