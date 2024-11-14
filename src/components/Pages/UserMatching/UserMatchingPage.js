import React from 'react';
import {Stack, Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import {styled} from "@mui/material/styles";
import Body from "../../Body";
import UserCard from "../../UserCard/UserCard";

const SwipeBox = styled(Box)(({theme}) => ({
    flex:"1",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
}));

export default function UserMatchingPage() {

    return (
        <Body sidebar>
            <Stack flex={4} direction="row" spacing={2} justifyContent={"space-between"}>
                <SwipeBox>
                    <IconButton aria-label="Swipe Left" size="large">
                        <ThumbDownOutlinedIcon fontSize="large"/>
                    </IconButton>
                </SwipeBox>
                <UserCard/>
                <SwipeBox>
                    <IconButton aria-label="Swipe Right" size="large">
                        <FavoriteBorderOutlinedIcon fontSize="large"/>
                    </IconButton>
                </SwipeBox>
            </Stack>
        </Body>
    );
}