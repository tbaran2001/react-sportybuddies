import React from 'react';
import {AppBar, Toolbar} from "@mui/material";
import {styled} from "@mui/material/styles";
import Logo from "./Logo";
import Icons from "./Icons";


const StyledToolbar = styled(Toolbar)(({theme}) => ({
    display: "flex",
    justifyContent: "space-between",
}));

export default function Navbar() {

    return (
        <AppBar sx={{
            bgcolor: 'background.main',
            color:"text",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }} position={"sticky"} elevation={0}>
            <StyledToolbar>
                <Logo/>
                <Icons/>
            </StyledToolbar>
        </AppBar>
    );
}