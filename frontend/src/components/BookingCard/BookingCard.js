import { Flex } from '@chakra-ui/layout'
import React, { useState, useEffect } from 'react'
import './BookingCard.css'
import { Tooltip, IconButton, useDisclosure, useToast } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'


import RoomA from '../../Assets/Images/RoomA.avif'
import UpdateModal from '../UpdateModal/UpdateModal'

const BookingCard = (props) => {
    const { booking, hashMap, getAllBookings } = props;
    // console.log("Props in Card", props);
    // for toast 
    const toast = useToast();

    // let booking = props.booking;
    const host = 'http://localhost:8000';
    // let hashMap = props.hashMap;
    // console.log("Booking data single", booking, hashMap['A-301']);
    const findTime = (time) => {
        const date = new Date(time);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        // const minutes = date.getMinutes().toString().padStart(2, '0');
        // const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedTime = `${day}-${month}-${year} ${hours}:00 Hrs`;

        return formattedTime;
    };

    useEffect(() => {

    }, [booking])

    const deleteBooking = async () => {
        // console.log("Booking clicked")
        try {
            const response = await fetch(`${host}/delete/${booking._id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.status === 200) {
                // console.log("Booking deleted successfully");
                let hours = (booking.start_time - Date.now()) / (1000 * 60 * 60);
                let refundMessage = "";
                // console.log("Hours remainig", hours);
                if (hours > 48) {
                    refundMessage = "Total Amount will be refunded";
                } else if (hours >= 24) {
                    refundMessage = "50% of the amount will be refunded";
                } else {
                    refundMessage = "No amount will be refunded";
                }
                toast({
                    position: 'top',
                    title: 'Booking deleted Successfully.',
                    description: refundMessage,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                getAllBookings();
            } else {
                // console.log("Error in deleting the post");
            }
        }
        catch (error) {
            console.log({ "error": error });
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex className='total' height={"20vh"} width={"100%"} border={"1px solid rgb(199,206,215)"} flexDirection={"column"} borderRadius={"1rem"} mb={"1rem"} p="1.5rem">
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex cursor="pointer"><img src={RoomA} alt="Hello" style={{ "height": "12vh", "borderRadius": "0.5rem" }} />
                    <Flex flexDirection={"column"} justifyContent={"center"} ml="1rem">
                        <Flex>
                            <Flex fontWeight={"bold"} fontSize={"1.1rem"}>Room no :</Flex>
                            <Flex fontWeight={"bold"}>&nbsp;{booking.Room_No}</Flex>
                        </Flex>
                        <Flex>
                            <Flex fontWeight={"bold"}>Check In :</Flex>
                            <Flex>&nbsp;{findTime(booking.start_time)}</Flex>
                        </Flex>
                        <Flex>
                            <Flex fontWeight={"bold"}>Check Out :</Flex>
                            <Flex>&nbsp;{findTime(booking.end_time)}</Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex flexDirection={"column"}>
                    <Flex>
                        <Flex fontWeight={"bold"}>Recipient :</Flex>
                        <Flex>&nbsp;{booking.email}</Flex>
                    </Flex>
                    <Flex>
                        <Flex fontWeight={"bold"}>Room Type :</Flex>
                        <Flex>&nbsp;{hashMap[booking.Room_No]?.type}</Flex>
                    </Flex>
                    <Flex>
                        <Flex fontWeight={"bold"}>Total Price :</Flex>
                        <Flex> &nbsp;{booking.total_price} /-</Flex>
                    </Flex>
                </Flex>
                <Flex>
                    <Tooltip label='Update Booking' hasArrow arrowSize={10}>
                        <IconButton onClick={onOpen} ml={3} aria-label='Call Segun' size='xs' fontSize={"1rem"} icon={<EditIcon />} />
                    </Tooltip>
                    <Tooltip label='Delete Booking' hasArrow arrowSize={10}>
                        <IconButton onClick={() => deleteBooking()} ml={3} aria-label='Call Segun' size='xs' fontSize={"1rem"} icon={<DeleteIcon />} />
                    </Tooltip>
                </Flex>
            </Flex>
            <UpdateModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} hashMap={hashMap} booking={booking} getAllBookings={getAllBookings} />
        </Flex>
    )
}

export default BookingCard
