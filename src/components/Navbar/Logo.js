import React from 'react';
import {Box, Typography} from "@mui/material";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {styled} from "@mui/material/styles";

const StyledBox = styled(Box)({
    display: "flex",
    alignItems: "center"
});

export default function Logo() {
    return (
        <StyledBox>
            <SportsSoccerIcon/>
            <Typography variant="h6" sx={{display: {xs: 'none', sm: 'block'}}}>
                SportyBuddies
            </Typography>
        </StyledBox>
    );
}
