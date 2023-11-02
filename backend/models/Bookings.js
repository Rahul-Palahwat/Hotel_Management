const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    Room_No: {
        type: String,
        required: true,
    },
    start_time: {
        type: Number,
        required: true,
    },
    end_time: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    Booking_date: {
        type: Date,
        // yha pr yen javascript ki date h Date.now isko Date.now() aise nhi likhna h as woh call ho jayega and hmm chahte h ki document insert pr run ho...
        default: Date.now
    },
})

const bookings = mongoose.model("bookings", bookingSchema);

module.exports = bookings;