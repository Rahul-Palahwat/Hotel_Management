import React, { useEffect, useState } from 'react'
import {
    Button, Flex, Input, Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Select, useToast
} from '@chakra-ui/react'


const UpdateModal = (props) => {
    // console.log("Props in update", props);
    const { isOpen, onClose, onOpen, hashMap, booking, getAllBookings } = props;
    const [bookingData, setBookingData] = useState(booking);
    const host = 'http://localhost:8000';
    const initialRef = React.useRef(null);

    const rooms = Object.keys(hashMap);

    // for toast 
    const toast = useToast();


    function formatDateToRequiredFormat(inputDate) {
        const date = new Date(inputDate);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

        return formattedDate;
    }


    let start_time = new Date(booking.start_time);
    start_time = formatDateToRequiredFormat(start_time);
    let end_time = new Date(booking.end_time);
    end_time = formatDateToRequiredFormat(end_time);
    // console.log("Booking details in edit", booking);

    const onInputChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        setBookingData({ ...bookingData, start_time: start_time, end_time: end_time })
    }, [booking])

    const UpdateBooking = async () => {


        let email = bookingData.email;
        let Room_No = bookingData.Room_No;
        // console.log("Booking data in update", bookingData);
        // console.log("price", hashMap, Room_No);
        // console.log("price", hashMap[Room_No]);

        // Create new Date objects and set the time components
        let start_time = new Date(bookingData.start_time);
        start_time.setMinutes(0);
        start_time.setSeconds(0);
        start_time.setMilliseconds(0);

        let end_time = new Date(bookingData.end_time);
        end_time.setMinutes(0);
        end_time.setSeconds(0);
        end_time.setMilliseconds(0);

        // Check if the end time is before the start time
        if (end_time < start_time) {
            toast({
                position: 'top',
                title: 'Booking not Possible.',
                description: `End time cannot be earlier than start time`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        // Check if the start time is in the past
        if (Date.now() > start_time.getTime()) {
            toast({
                position: 'top',
                title: 'Booking not Possible.',
                description: `Start time cannot be in the past`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        // Calculate total hours and total price
        let totalHours = (end_time - start_time) / (1000 * 60 * 60);
        let total_price = totalHours * hashMap[Room_No].price;

        start_time = start_time.getTime();
        end_time = end_time.getTime();
        let response = await fetch(`${host}/update/${booking._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, Room_No, start_time, end_time, total_price })
        });
        if (response.status == 200) {
            console.log("Successfully booking done");
            toast({
                position: 'top',
                title: 'Booking updated Successfully.',
                description: `Total Price - ${total_price}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            getAllBookings();
            onClose();
        } else {
            // console.log("Booking can't be done")
            toast({
                position: 'top',
                title: 'Booking can not be updated.',
                description: `Room not available`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <Modal size={'lg'}
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent >
                <Flex direction={"column"} p={0}>
                    <ModalHeader ><Flex justifyContent="center">Update Booking</Flex></ModalHeader>
                    <Flex justifyContent={"center"}><hr style={{ "width": "100%" }} /></Flex>
                    <ModalBody p={0} >

                        <Flex width={"100%"} alignItems={"center"} mt="1rem" justifyContent={"center"}>
                            <Flex>Email</Flex>
                            <Flex ml="2rem"><Input
                                size="md"
                                value={bookingData.email}
                                placeholder='Enter email'
                                type="email"
                                name="email"
                                onChange={(e) => onInputChange(e)}
                            /></Flex>
                        </Flex>
                        <Flex width={"100%"} alignItems={"center"} mt="1rem" justifyContent={"center"}>
                            <Flex>Room no </Flex>
                            <Flex ml="2rem">
                                <Select defaultValue={bookingData.Room_No} placeholder='Select Room' name="Room_No" onChange={(e) => onInputChange(e)}>
                                    {rooms.map((room, i) => (
                                        <option key={i}>{room}</option>
                                    ))}
                                </Select>
                            </Flex>
                        </Flex>
                        <Flex width={"100%"} alignItems={"center"} mt="1rem" justifyContent={"center"}>
                            <Flex>From</Flex>
                            <Flex ml="2rem"><Input
                                size="md"
                                value={bookingData.start_time}
                                type="datetime-local"
                                name="start_time"
                                onChange={(e) => onInputChange(e)}
                            /></Flex>
                        </Flex>
                        <Flex width={"100%"} alignItems={"center"} mt="1rem" justifyContent={"center"}>
                            <Flex>To</Flex>
                            <Flex ml="2rem"><Input
                                size="md"
                                value={bookingData.end_time}
                                type="datetime-local"
                                name="end_time"
                                onChange={(e) => onInputChange(e)}
                            /></Flex>
                        </Flex>

                    </ModalBody>
                    <Flex justifyContent={"center"} mt="1rem"><hr style={{ "width": "100%" }} /></Flex>
                    <Flex pb={2} pt={3} width={"83%"} justifyContent="flex-end" mt={"0.5rem"} mb={"0.3rem"}>
                        <ModalFooter p={0}>
                            <Button type='submit' size={'sm'} form='customer_form' colorScheme='blue' mr={2} onClick={() => UpdateBooking()}>
                                Update
                            </Button>
                            <Button size={'sm'} onClick={onClose} ml={2}>Cancel</Button>
                        </ModalFooter>
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    )
}

export default UpdateModal


