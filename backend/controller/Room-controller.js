const Rooms = require('../models/Rooms');

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Rooms.find({});
        res.status(200).json(rooms);
    }
    catch (error) {
        console.log("Error encountered", error);
        res.status(500).json(error);
    }
}

const addRoom = async (req, res) => {
    try {
        let { Room_No, Type, Price } = req.body;
        let room = await Rooms.find({ Room_No: Room_No });
        console.log("Rooms", room)
        if (room.length > 0) {
            res.status(500).send("Room already exist's");
            return;
        }
        room = await new Rooms(req.body);
        room.save();
        res.status(200).json("Room added successfully");
    }
    catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { getAllRooms, addRoom };