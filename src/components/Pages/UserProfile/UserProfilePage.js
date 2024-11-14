import React from 'react';
import {Stack} from "@mui/material";
import UserCard from "../../UserCard";
import Preferences from "./Preferences";
import Body from "../../Body";


export default function UserProfilePage() {

    return (
        <Body sidebar>
            <Stack flex={4} direction="row" spacing={2} justifyContent={"space-between"}>
                <UserCard/>
                <Preferences/>
            </Stack>
        </Body>
    );
}