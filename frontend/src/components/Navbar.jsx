import React from 'react'
import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { CiSquarePlus, CiLight, CiDark } from "react-icons/ci";
import { Link } from "react-router-dom";

function Navbar() {
    const {toggleColorMode} = useColorMode();

    return (
        <Container maxW="90%" px={4}>
            <Flex h="10vh" align={"center"} justify={"space-between"} direction={{
                base: "column",
                sm: "row"
            }}>
                <Text
                    bgGradient='linear(to-l, cyan.400, blue.500)'
                    bgClip='text'
                    fontSize={{base: "22", sm: "28"}}
                    fontWeight='bold'
                    textTransform={"uppercase"}
                    textAlign={"center"}
                >
                    <Link to={"/"}>Product Store🛒</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button><CiSquarePlus fontSize={20} /></Button>
                    </Link>
                    <Link to={""}>
                        <Button  onClick={toggleColorMode}>{useColorModeValue(<CiDark />, <CiLight />)}</Button>
                    </Link>
                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar