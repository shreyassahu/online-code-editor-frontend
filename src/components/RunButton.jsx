import React, { useState, useRef } from 'react'
import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";


const RunButton = () => {
    return (
        <Box ml={2} mb={4}>
            <Text mb={2} fontSize="lg">
                Output:
            </Text>
            <Button>Run Code</Button>
        </Box>
    );
}

export default RunButton;