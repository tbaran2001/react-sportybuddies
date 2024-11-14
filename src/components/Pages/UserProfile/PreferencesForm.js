import React, {useState} from 'react';
import {Box} from '@mui/material';
import AgeRangeSlider from "./AgeRangeSlider";
import DistanceSlider from "./DistanceSlider";

export default function PreferencesForm() {

    return (
        <Box sx={{padding: 3, maxWidth: 400, margin: 'auto'}}>
            <AgeRangeSlider/>
            <DistanceSlider/>
        </Box>
    );
}
