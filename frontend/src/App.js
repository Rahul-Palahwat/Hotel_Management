import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react';

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'



const initialFilters = {
  status: "all",
  room_type: "",
  room_no: "All",
  start_time: 0,
  end_time: 0
}


function App() {
  const [hashMap, setHashMap] = useState([]);
  const [bookings, setBookings] = useState([]);
  const host = 'http://localhost:8000';


  const [filters, setFilters] = useState(initialFilters);



  let tempMap = {};
  const addKey = (key, type, price) => {
    tempMap[key] = { type, price };
  }
  const addRoomsToMap = (data) => {
    data.map((room) => {
      addKey(room.Room_No, room.Type, room.Price);
      // console.log("Room", room);
    })
    setHashMap(tempMap);

    // console.log("data from map", hashMap["A-301"])
  }


  const checkFilter = (obj) => {
    let Room_No = obj.Room_No;
    let start_time = obj.start_time;
    let end_time = obj.end_time;

    if (filters.status === "upcoming") {
      // console.log("upcoming");
      if (Date.now() > start_time) {
        return false;
      }
    } else if (filters.status === "passed") {
      // console.log("passed");
      if (Date.now() < start_time) {
        return false;
      }
    }

    if (filters.room_type === 'Deluxe') {
      // console.log("Deluxe");
      if (hashMap[Room_No].type !== "Deluxe") {
        return false;
      }
    } else if (filters.room_type === 'AC') {
      // console.log("AC");
      if (hashMap[Room_No].type !== "AC") {
        return false;
      }
    } else if (filters.room_type === "NON AC") {
      // console.log("NON AC");
      if (hashMap[Room_No].type !== "NON AC") {
        return false;
      }
    }

    if ((filters.room_no) !== "All") {
      // console.log("Room no", filters.room_no, filters);
      if (Room_No !== filters.room_no) {
        return false;
      }
    }

    if (filters.start_time > 0) {
      // console.log("start_time");
      if (start_time !== filters.start_time) {
        return false;
      }
    }

    if (filters.end_time > 0) {
      // console.log("End Time");
      if (filters.end_time !== end_time) {
        return false;
      }
    }

    return true;
  }


  const getAllBookings = async () => {
    // console.log("I am inside fectch")
    let response = await fetch(`${host}/get_all_bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    let json = await response.json();
    // console.log("Data from backend", json);
    let dataAfterFilter = [];
    for (let i = 0; i < json.length; i++) {
      // console.log("Json file", json[i]);
      if (checkFilter(json[i])) {
        dataAfterFilter.push(json[i]);
      }
    }
    setBookings(dataAfterFilter);
    response = await fetch(`${host}/allRooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    json = await response.json();
    addRoomsToMap(json);
  }
  useEffect(() => {
    getAllBookings();
  }, [filters])

  console.log(bookings)
  return (
    <Wrapper>
      <Navbar hashMap={hashMap} getAllBookings={getAllBookings} />
      <Routes>
        <Route path="/" element={<Home bookings={bookings} hashMap={hashMap} getAllBookings={getAllBookings} filters={filters} setFilters={setFilters} />}></Route>
      </Routes>
    </Wrapper>
  );
}


const Wrapper = (props) => {
  return (<>
    <Box style={{ "backgroundColor": "white" }}>
      <Box>
        {props.children}
      </Box>
    </Box>
    <Box>
      <Footer />
    </Box>
  </>
  )
}

export default App;

