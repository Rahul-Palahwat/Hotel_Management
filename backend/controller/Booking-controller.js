const Bookings = require('../models/Bookings');

// const nodemailer = require("nodemailer");


// const sendEmail = async () => {
//     let testAccount = await nodemailer.createTestAccount();

//     const transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         // secure: true,
//         auth: {
//             // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//             user: 'zetta54@ethereal.email',
//             pass: 'EGnr6EjqX8jnRCTjRq'
//         },
//     });

//     let info = await transporter.sendMail({
//         from: '"Hotel MountBlue 👻" <zetta54@ethereal.email>', // sender address
//         to: "rahulpalahwat@gmail.com, 20bec081@iiitdmj.ac.in", // list of receivers
//         subject: "Booking Details", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     })

//     console.log("Info of mail", info);


// }

const { bookingPossible, bookingUpdatePossible } = require('../utils/validation')


const newBooking = async (req, res) => {
    try {
        const bookings = await Bookings.find({});
        // const { email, room_no, type, start_time, end_time, price, total_price } = req.body;
        // const start_t = new Date(start_time);
        // const end_t = new Date(end_time);
        // console.log(start_t, end_t);
        // console.log("I am room no", req.body.Room_No);
        const room_no = req.body.Room_No;
        if (bookingPossible(bookings, room_no, req.body.start_time, req.body.end_time)) {
            const newObj = await new Bookings(req.body);
            newObj.save();
            res.status(200).json("Booking done successfully");
        } else {
            console.log("Booking not possible")
            res.status(500).json("Booking not possible");
        }
    }
    catch (error) {
        console.log("Error encountered", error);
        res.status(500).json(error);
    }
}

const updateBooking = async (req, res) => {
    try {
        let booking = await Bookings.findById(req.params.id);
        if (!booking) {
            res.status(500).send("Not found");
        }
        let bookings = await Bookings.find({});
        if (bookingUpdatePossible(bookings, req.body.Room_No, req.body.start_time, req.body.end_time, req.params.id)) {
            console.log("Heliisfdnsdfdsf")
            booking = await Bookings.findByIdAndUpdate(
                req.params.id,
                { ...req.body },
                { new: true }
            )
            res.status(200).send("Update done");
        } else {
            console.log("Booking can't be updated")
            res.status(500).send("Booking can't be updated");
        }
        console.log(booking);
    }
    catch (error) {
        res.status(500).json(error);
    }

}


const deleteBooking = async (req, res) => {
    try {
        let booking = await Bookings.findById(req.params.id);
        if (!booking) {
            res.status(500).send("Not found");
        }
        booking = await Bookings.findByIdAndDelete(req.params.id);
        res.status(200).send("Booking deleted successfully");
    }
    catch (error) {
        res.status(500).json(error);
    }
}

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Bookings.find({}).sort({ Booking_date: -1 });;
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { getAllBookings, newBooking, updateBooking, deleteBooking }