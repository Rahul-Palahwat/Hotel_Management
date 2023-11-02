import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Logo from '../../Assets/Images/Logo.jpg'

import AddModal from '../AddModal/AddModal';

const Navbar = (props) => {
    const { hashMap, getAllBookings } = props;
    // console.log(props)
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Flex height={"10vh"} width={"100%"} color={"white"} backgroundColor={"rgb(238,79,94)"} justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"} ml="1rem">
                    <Flex><img src={Logo} alt="Hello" style={{ "height": "7vh", "borderRadius": "1.7rem" }} /></Flex>
                    <Flex ml="0.5rem" fontWeight={"bold"} fontSize={"1.1rem"}>Hotel MountBlue</Flex>
                </Flex>
                <Flex>Manage your bookings</Flex>
                <Flex mr="2rem">
                    {/* <Button colorScheme='blue' variant='outline'>
                        New Booking
                    </Button> */}
                    <Button
                        size='md'
                        height='48px'
                        border='2px'
                        borderColor='white'
                        onClick={onOpen}
                    >
                        New Booking
                    </Button>
                </Flex>
            </Flex>
            <AddModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} hashMap={hashMap} getAllBookings={getAllBookings} />
        </>
    )
}

export default Navbar
