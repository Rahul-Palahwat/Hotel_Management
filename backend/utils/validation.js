const bookingPossible = (bookings, room_no, start_time, end_time) => {
    for (const booking of bookings) {
        console.log("chejmdsndfs", booking, room_no, booking.room_no);
        if (booking.Room_No === room_no) {
            const start = Math.max(booking.start_time, start_time);
            const end = Math.min(booking.end_time, end_time);
            console.log("STart time", start, end);
            if (start <= end) {
                return false;
            }
        }
    }
    return true;
}

const bookingUpdatePossible = (bookings, room_no, start_time, end_time, id) => {
    console.log("Hello world")
    for (const booking of bookings) {
        console.log("Id's are", booking._id.toString(), id);
        if (booking.Room_No === room_no && booking._id.toString() !== id) {
            const start = Math.max(booking.start_time, start_time);
            const end = Math.min(booking.end_time, end_time);
            console.log("STart time", start, end);
            if (start <= end) {
                return false;
            }
        }
    }
    return true;
}

module.exports = { bookingPossible, bookingUpdatePossible }