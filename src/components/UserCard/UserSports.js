import React from 'react';
import {Box} from "@mui/material";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {styled} from "@mui/material/styles";

const StyledBox = styled(Box)(({theme}) => ({
    color: theme.palette.secondary.main,
}));

export default function UserSports() {
    return (
        <StyledBox>
            <SportsSoccerIcon/>
            <SportsSoccerIcon/>
            <SportsSoccerIcon/>
            <SportsSoccerIcon/>
        </StyledBox>
    );
}