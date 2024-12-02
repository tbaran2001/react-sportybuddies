import React from 'react';
import {Stack} from "@mui/material";
import UserCard from "../../UserCard/UserCard";
import Preferences from "./Preferences";
import Body from "../../Body";
import {useUser} from "../../../contexts/UserProvider";
import {UserSportsProvider} from "../../../contexts/UserSportsProvider";


export default function UserProfilePage() {
    const {user} = useUser();

    return (
        <Body sidebar>
            <Stack flex={4} direction="row" spacing={2} justifyContent={"space-between"}>
                <UserSportsProvider>
                    <UserCard user={user} userSports={user.sports}/>
                    <Preferences/>
                </UserSportsProvider>
            </Stack>
        </Body>
    );
}