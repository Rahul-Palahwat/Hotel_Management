import React, { useEffect, useState } from 'react'
import BookingCard from '../BookingCard/BookingCard'
import { Flex } from '@chakra-ui/layout'

import './Bookings.css'

const Bookings = (props) => {
    // console.log("Hellos i am insode booking", props);
    const { bookings, hashMap, getAllBookings } = props;

    // const { bookings, setBookings } = useState([]);
    // useEffect(() => {
    //     setBookings(props.bookings);
    // }, [props])
    // console.log("Bookings let", bookings);
    return (<Flex direction={"column"} alignItems={"center"} width={"100%"}>
        <Flex alignContent={"center"} fontSize={"2rem"} m="1rem">Bookings</Flex>
        <Flex className='scroll' width={"100%"}>
            <Flex flexDirection={"column"} width={"100%"} ml="2rem" mr="2rem" alignItems={"center"}>
                {bookings.map((booking, i) => {
                    return (<BookingCard booking={booking} key={i} hashMap={hashMap} getAllBookings={getAllBookings} />)
                })}
                {/* <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard />
                <BookingCard /> */}
            </Flex>
        </Flex>
    </Flex>
    )
}

export default Bookings
