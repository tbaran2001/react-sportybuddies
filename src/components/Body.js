import React from 'react';
import {Box, Stack} from "@mui/material";
import Sidebar from "./Sidebar";

export default function Body({sidebar,children}) {
    return (
        <Box p={2} >
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                {sidebar && <Sidebar/>}
                {children}
            </Stack>
        </Box>
    );
}