import React, { useRef, useState } from 'react'

import emailjs from '@emailjs/browser'

import {
    Button, Flex, Input, Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, FormControl, Select, useToast
} from '@chakra-ui/react'

const bookingInitialValues = {
    email:"",
    Room_No:"",
    start_time:"",
    end_time:"",
    total_price:100
}

const AddModal = (props) => {


    const form = useRef();

    const { isOpen, onClose, onOpen , hashMap, getAllBookings} = props;
    console.log(getAllBookings)
    const host = 'http://localhost:8000';
    const initialRef = React.useRef(null);
    // console.log(getAllBookings)
    // for toast 
    const toast = useToast();

    const rooms = Object.keys(hashMap);
    console.log("Rooms are", rooms);
    const [bookingData, setBookingData] = useState(bookingInitialValues);

    const onInputChange = (e) => {
        setBookingData({...bookingData, [e.target.name]: e.target.value})
    };


    // const sendEmail = (e) => {
    //     e.preventDefault();
    
    //     emailjs.sendForm("service_7y7i11a", "template_vevg08b", form.current, "RgElPJPGlldyZiTU5")
    //         .then((result) => {
    //             // console.log(form.current);
    //             console.log(result.text);
    //             toast.success('Your form is sent successfully!', {
    //                 position: "top-right",
    //                 autoClose: 1000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //             setTimeout(() => {
    //                 // navigate('/')
    //             }, 1500);
    //         }, (error) => {
    //             console.log(error.text);
    //             toast.error('Sorry! Some Error Occurred', {
    //                 position: "top-right",
    //                 autoClose: 1000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //         });
    // };

    const BookRoom = async () => {
        let email = bookingData.email;
        let Room_No = bookingData.room_no;
        let start_time = new Date(bookingData.start_time).getTime();
        let end_time = new Date(bookingData.end_time).getTime();
        let totalHours = (end_time - start_time)/(1000*60*60);
        console.log("Total Hours" , totalHours, hashMap[Room_No].price);
        let total_price = totalHours*hashMap[Room_No].price;
        // console.log("Booking data to save" , bookingData);
        // console.log("Booking data to save" , start_time, end_time);
        if(end_time < start_time){
            toast({
                position: 'top',
                title: 'Booking not Possible.',
                description: `Date is Invalid s>e`,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return;
        }
        if(Date.now() > start_time){
            toast({
                position: 'top',
                title: 'Booking not Possible.',
                description: `Date is Invalid`,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              console.log("Dates", Date.now(), start_time);
              return;
        }
        let response = await fetch(`${host}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,Room_No,start_time,end_time,total_price}) 
        });
        if(response.status == 200){
            toast({
                position: 'top',
                title: 'Booking done Successfully.',
                description: `Total Price - ${total_price}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            console.log("Successfully booking done");
            getAllBookings();
            onClose();
            // sendEmail();
        }else{
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
    
    return (
        <>
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
        </>
    )
}

export default AddModal











// const signupInitialValues = {
//   name: "",
//   username: "",
//   password: "",
// };


//   const onInputChange = (e) => {
//     setSignup({ ...signup, [e.target.name]: e.target.value });
//   };

//   const loginUser = async () => {
//     try {
//       let response = await API.userLogin(login);
//       console.log(response);
//     } catch (error) {
//       alert("Invalid Username or Password");
//       console.log("helloerro", error);
//     }
//     let response = await API.userLogin(login);
//     if (response.isSuccess) {
//       showError("");

//       sessionStorage.setItem(
//         "accessToken",
//         `Bearer ${response.data.accessToken}`
//       );
//       sessionStorage.setItem(
//         "refreshToken",
//         `Bearer ${response.data.refreshToken}`
//       );
//       setAccount({
//         name: response.data.name,
//         username: response.data.username,
//       });
//       isUserAuthenticated(true);
//       setLogin(loginInitialValues);
//       alert("Logged In Successfully");
//       navigate("/");
//     } else {
//       console.log("login failed");
//       alert("Login Failed");
//       showError("Something went wrong! please try again later");
//     }
//   };

//   const signupUser = async () => {
//     let response = await API.userSignup(signup);

//     if (response.isSuccess) {
//       showError("");
//       setSignup(signupInitialValues);
//       toggleAccount("login");
//       alert("Sign Up Successfully");
//     } else {
//       alert("Login Failed");
//       showError("Something went wrong! please try again later");
//       // alert("Sign Up Failed");
//       console.log(error);
//     }
//   };

//   const toggleSignup = () => {
//     account === "signup" ? toggleAccount("login") : toggleAccount("signup");
//   };
  
//   return (
//     <Component>
//       {/* <ParticlesBg type="random" bg={true}/> */}
//       <Box>
//         {account === "login" ? (
//           <Wrapper>
//             <TextField
//               variant="standard"
//               value={login.username}
//               onChange={(e) => onValueChange(e)}
//               name="username"
//               label="Enter Username"
//             />
//             <TextField
//               variant="standard"
//               value={login.password}
//               onChange={(e) => onValueChange(e)}
//               name="password"
//               label="Enter Password"
//             />

//             {error && <Error>{error}</Error>}

//             <LoginButton variant="contained" onClick={() => loginUser()}>
//               Login
//             </LoginButton>
//             <Text style={{ textAlign: "center" }}>OR</Text>
//             <SignupButton
//               onClick={() => toggleSignup()}
//               style={{ marginBottom: 50 }}
//             >
//               Create an account
//             </SignupButton>
//           </Wrapper>
//         ) : (
//           <Wrapper>
//             <TextField
//               variant="standard"
//               value={signup.name}
//               onChange={(e) => onInputChange(e)}
//               name="name"
//               label="Enter Name"
//             />
//             <TextField
//               variant="standard"
//               value={signup.username}
//               onChange={(e) => onInputChange(e)}
//               name="username"
//               label="Enter Username"
//             />
//             <TextField
//               variant="standard"
//               value={signup.password}
//               onChange={(e) => onInputChange(e)}
//               name="password"
//               label="Enter Password"
//             />

//             <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
//             <Text style={{ textAlign: "center" }}>OR</Text>
//             <LoginButton variant="contained" onClick={() => toggleSignup()}>
//               Already have an account
//             </LoginButton>
//           </Wrapper>
//         )}
//       </Box>
//     </Component>
//   );
// };
// export default Login;
