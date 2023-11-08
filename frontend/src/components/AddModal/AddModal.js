import React, { useRef, useState } from 'react'

import emailjs from '@emailjs/browser'

import {
    Button, Flex, Input, Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, FormControl, Select, useToast
} from '@chakra-ui/react'

const bookingInitialValues = {
    email: "",
    Room_No: "",
    start_time: "",
    end_time: "",
    total_price: 100
}

const AddModal = (props) => {


    const form = useRef();

    const { isOpen, onClose, onOpen, hashMap, getAllBookings } = props;
    // console.log(getAllBookings)
    const host = 'http://localhost:8000';
    const initialRef = React.useRef(null);
    // console.log(getAllBookings)
    // for toast 
    const toast = useToast();

    const rooms = Object.keys(hashMap);
    // console.log("Rooms are", rooms);
    const [bookingData, setBookingData] = useState(bookingInitialValues);

    const onInputChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value })
    };


    const BookRoom = async (e) => {
        let email = bookingData.email;
        let Room_No = bookingData.room_no;
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
        let response = await fetch(`${host}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, Room_No, start_time, end_time, total_price })
        });
        if (response.status == 200) {
            toast({
                position: 'top',
                title: 'Booking done Successfully.',
                description: `Total Price - ${total_price}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            console.log("Successfully booking done");
            setTimeout(() => {
                getAllBookings();
            }, 1500)
            // getAllBookings();
            onClose();
            sendEmail(e);
        } else {
            toast({
                position: 'top',
                title: 'Booking not possible.',
                description: `Room not available`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            console.log("Booking can't be done")
        }
    }


    const sendEmail = (e) => {
        // console.log("EMail is sent successfully");

        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                // setTimeout(() => {
                //     navigate('/')
                // }, 1500);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <Modal size={'lg'}
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent >
                <Flex direction={"column"} p={0}>
                    <ModalHeader ><Flex justifyContent="center">Book a new Room</Flex></ModalHeader>
                    <Flex justifyContent={"center"}><hr style={{ "width": "100%" }} /></Flex>
                    <form ref={form}>
                        <ModalBody p={0} >

                            <Flex width={"100%"} alignItems={"center"} mt="1rem" justifyContent={"center"}>
                                <Flex>Email</Flex>
                                <Flex ml="2rem"><Input
                                    size="md"
                                    placeholder='Enter email'
                                    type="email"
                                    name="email"
                                    onChange={(e) => onInputChange(e)}
                                /></Flex>
                            </Flex>
                            <Flex width={"100%"} alignItems={"center"} mt="1rem" justifyContent={"center"}>
                                <Flex>Room no </Flex>
                                <Flex ml="2rem">
                                    <FormControl>
                                        <Select placeholder='Select Room' name="room_no" onChange={(e) => onInputChange(e)}>
                                            {rooms.map((room, i) => (
                                                <option key={i}>{room}</option>
                                            ))}
                                            {/* <option key={"1"}>A-301</option>
                                            <option key={"2"}>A-302</option>
                                            <option key={"3"}>B-201</option>
                                            <option key={"4"}>C-101</option> */}
                                        </Select>
                                    </FormControl>
                                </Flex>
                            </Flex>
                            <Flex width={"100%"} alignItems={"center"} mt="1rem" justifyContent={"center"}>
                                <Flex>From</Flex>
                                <Flex ml="2rem"><Input
                                    size="md"
                                    type="datetime-local"
                                    name="start_time"
                                    onChange={(e) => onInputChange(e)}
                                /></Flex>
                            </Flex>
                            <Flex width={"100%"} alignItems={"center"} mt="1rem" justifyContent={"center"}>
                                <Flex>To</Flex>
                                <Flex ml="2rem"><Input
                                    size="md"
                                    type="datetime-local"
                                    name="end_time"
                                    onChange={(e) => onInputChange(e)}
                                /></Flex>
                            </Flex>

                        </ModalBody>
                    </form>
                    <Flex justifyContent={"center"} mt="1rem"><hr style={{ "width": "100%" }} /></Flex>
                    <Flex pb={2} pt={3} width={"83%"} justifyContent="flex-end" mt={"0.5rem"} mb={"0.3rem"}>
                        <ModalFooter p={0}>
                            <Button type='submit' size={'sm'} form='customer_form' colorScheme='blue' mr={2} onClick={() => BookRoom()}>
                                Submit
                            </Button>
                            <Button size={'sm'} onClick={onClose} ml={2}>Cancel</Button>
                        </ModalFooter>
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    )
}

export default AddModal


