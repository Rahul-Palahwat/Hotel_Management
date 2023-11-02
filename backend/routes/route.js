const express = require('express');

const router = express.Router();

const Hello = require('../controller/Mail-controller');

const { newBooking, getAllBookings, updateBooking, deleteBooking } = require('../controller/Booking-controller')

const { getAllRooms, addRoom } = require('../controller/Room-controller');


router.get('/', Hello);


router.post('/book', newBooking);
router.put('/update/:id', updateBooking);
router.delete('/delete/:id', deleteBooking);
router.get('/get_all_bookings', getAllBookings);

router.get('/allRooms', getAllRooms);
router.post('/addRoom', addRoom);


module.exports = router;