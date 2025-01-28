import React, {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import SportsPicker from "./SportsPicker";

export default function SportsForm() {

    return (
        <Box sx={{padding: 3, margin: 'auto'}}>
            <Typography variant="h3" align={"center"}>
                Twoje aktywności sportowe
            </Typography>
            <SportsPicker/>
        </Box>
    );
}
