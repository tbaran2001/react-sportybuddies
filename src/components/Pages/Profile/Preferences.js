import React from 'react';
import {Box, Typography} from "@mui/material";
import PreferencesForm from "./PreferencesForm";
import SportsForm from "./SportsForm";

export default function Preferences() {

    return (
        <Box flex={1}>
            <Typography variant="h3" align={"center"}>
                Edit your preferences
            </Typography>
            <PreferencesForm/>
            <SportsForm/>
        </Box>
    );
}