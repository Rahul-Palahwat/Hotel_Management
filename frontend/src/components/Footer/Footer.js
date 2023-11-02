import React from 'react'
import { Flex } from '@chakra-ui/layout'

const Footer = () => {
    return (
        <>
            <Flex height={"12vh"} direction={"column"} color={"white"} width={"100%"} backgroundColor={"rgb(238,79,94)"} justifyContent={"center"} alignItems={"center"}>
                <Flex fontWeight={"bold"} fontSize={"1.5rem"}>HOTEL MOUNTBLUE</Flex>
                <Flex>Copyright &#169; 2023 Rahul Kumar</Flex>
            </Flex>
        </>
    )
}

export default Footer
