import { Button, Flex, Input, Select } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import Bookings from '../Bookings/Bookings'

import './Home.css'

const Home = (props) => {
    const { bookings, hashMap, getAllBookings, filters, setFilters } = props;
    // console.log("Props in home", props);

    const rooms = Object.keys(hashMap);

    const [bookingStatus, setBookingStatus] = useState("all");

    const updateStatus = (val) => {
        setBookingStatus(val);
        let newFilters = filters;
        newFilters.status = val;
        setFilters(newFilters);
        // console.log("Updated filters", bookingStatus, filters, val);
        getAllBookings();
    }


    const [roomType, setRoomType] = useState("");
    const updateRoomType = (val) => {
        // console.log("Hello insise update")
        setRoomType(val);
        let newFilters = filters;
        newFilters.room_type = val;
        setFilters(newFilters);
        // console.log("Updated filters", roomType, filters, val);
        getAllBookings();
    }


    const [roomNo, setRoomNo] = useState("All");
    const onChangeSelected = (e) => {
        let val = e.target.value;
        setRoomNo(val);
        let newFilters = filters;
        newFilters.room_no = val;
        setFilters(newFilters);
        getAllBookings();
    }

    const [startDate, setStartDate] = useState('');
    const onChangeStart = (e) => {
        let val = e.target.value;
        let date = new Date(val);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        const istOffset = 330; // IST is UTC+5:30
        date.setMinutes(date.getMinutes() + istOffset);
        const formattedDate = date.toISOString().slice(0, 16);
        setStartDate(formattedDate);
        console.log("Date in filter", date, formattedDate)
        let newFilters = filters;
        val = date.getTime();
        // console.log("Val in time", val);
        newFilters.start_time = val;
        setFilters(newFilters);
        getAllBookings();
    }


    const [endDate, setEndDate] = useState('');
    const onChangeEnd = (e) => {
        let val = e.target.value;
        let date = new Date(val);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        const istOffset = 330; // IST is UTC+5:30
        date.setMinutes(date.getMinutes() + istOffset);
        const formattedDate = date.toISOString().slice(0, 16);
        setEndDate(formattedDate);
        console.log("Date in filter", date, formattedDate)
        let newFilters = filters;
        val = date.getTime();
        // console.log("Val in time", val);
        newFilters.end_time = val;
        setFilters(newFilters);
        getAllBookings();
    }


    const removeAllFilters = () => {
        let newFilters = filters;
        newFilters.end_time = "";
        newFilters.start_time = "";
        newFilters.status = "all";
        newFilters.room_type = "";
        newFilters.room_no = "All";
        setStartDate('');
        setEndDate('');
        setBookingStatus('all');
        setRoomType('');
        setRoomNo('All');
        getAllBookings();
    }


    useEffect(() => {

    }, [roomType, bookingStatus])

    return (
        <Flex height={"110vh"} width={"100%"} p="0.5rem" className='home'>
            <Flex border={"1px solid rgb(199,206,215)"} borderRadius={"0.5rem"} p="1rem" m="1rem" className='total'>
                <Flex fontSize={"1.5rem"} fontWeight={"bold"}>Filters</Flex>
                <Flex justifyContent={"center"}><hr style={{ "width": "100%" }} /></Flex>
                <Flex mt="1rem" fontWeight={"bold"} justifyContent={"space-between"} width={"80%"}>
                    Booking Status
                </Flex>
                <Flex mt="1rem" mb="1rem" justifyContent={"space-between"} width={"90%"}>
                    <Button onClick={() => updateStatus("all")} variant='outline' colorScheme={bookingStatus === "all" ? "green" : "blue"}>
                        All
                    </Button>
                    <Button variant='outline' onClick={() => updateStatus("upcoming")} colorScheme={bookingStatus === "upcoming" ? "green" : "blue"}>
                        Upcoming
                    </Button>
                    <Button variant='outline' onClick={() => updateStatus("passed")} colorScheme={bookingStatus === "passed" ? "green" : "blue"}>
                        Passed
                    </Button>
                </Flex>
                <Flex justifyContent={"center"}><hr style={{ "width": "100%" }} /></Flex>
                <Flex mt="1rem" fontWeight={"bold"} justifyContent={"space-between"} width={"90%"}>
                    Room Type
                </Flex>
                <Flex mt="1rem" mb="1rem" justifyContent={"space-between"} width={"80%"}>
                    <Button variant='outline' onClick={() => updateRoomType("Deluxe")} colorScheme={roomType === "Deluxe" ? "green" : "blue"} >
                        Deluxe
                    </Button>
                    <Button variant='outline' onClick={() => updateRoomType("AC")} colorScheme={roomType === "AC" ? "green" : "blue"}>
                        AC
                    </Button>
                    <Button variant='outline' onClick={() => updateRoomType("NON AC")} colorScheme={roomType === "NON AC" ? "green" : "blue"} >
                        Non AC
                    </Button>
                </Flex>
                <Flex justifyContent={"center"}><hr style={{ "width": "100%" }} /></Flex>
                <Flex mt="1rem" fontWeight={"bold"} justifyContent={"space-between"} width={"80%"}>
                    Room no
                </Flex>
                <Flex width={"100%"} bgColor="white" mt="1rem" mb="1rem">
                    <Select placeholder='Select Room' name="room_no" onChange={onChangeSelected} value={roomNo}>
                        <option key={-1} selected value={"All"}>All</option>
                        {rooms.map((room, i) => (
                            <option key={i} value={room}>{room}</option>
                        ))}
                    </Select>
                </Flex>
                <Flex justifyContent={"center"}><hr style={{ "width": "100%" }} /></Flex>
                <Flex mt="1rem" fontWeight={"bold"} justifyContent={"space-between"} width={"80%"}>
                    Start Date
                </Flex>
                <Flex width={"100%"} bgColor="white" mt="1rem" mb="1rem">
                    <Flex width={"40vw"} bgColor="white" alignItems={"center"} borderRadius={5}>
                        <Flex width={"100%"}>
                            <Input onChange={onChangeStart} type="datetime-local" value={startDate} />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex justifyContent={"center"}><hr style={{ "width": "100%" }} /></Flex>
                <Flex mt="1rem" fontWeight={"bold"} justifyContent={"space-between"} width={"80%"}>
                    End Date
                </Flex>
                <Flex width={"100%"} bgColor="white" mt="1rem" mb="1rem">
                    <Flex width={"40vw"} bgColor="white" alignItems={"center"} borderRadius={5}>
                        <Flex width={"100%"}>
                            <Input type="datetime-local" onChange={onChangeEnd} value={endDate} />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex justifyContent={"center"}><hr style={{ "width": "100%" }} /></Flex>

                <Button mt="2rem" variant='outline' onClick={removeAllFilters} colorScheme="blue" >
                    Remove Filters
                </Button>
            </Flex>
            <Flex width={"75%"}>
                <Bookings bookings={bookings} hashMap={hashMap} getAllBookings={getAllBookings} />
            </Flex>
        </Flex>
    )
}

export default Home
