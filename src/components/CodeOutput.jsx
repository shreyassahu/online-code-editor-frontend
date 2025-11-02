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
import RunButton from './RunButton';
import axios from 'axios';
import { executeCode } from '../api';

const CodeOutput = ({ codeOutput }) => {
    return (
        <Box>
            {codeOutput == null ? console.log("flkjf") : <p>{codeOutput.stdout}</p>}
        </Box>
    );
}


export default CodeOutput;