import React from 'react';
import {Stack} from "@mui/material";
import ProfileCard from "../../ProfileCard/ProfileCard";
import Preferences from "./Preferences";
import Body from "../../Body";
import {useUser} from "../../../contexts/UserProvider";
import {ProfileSportsProvider} from "../../../contexts/ProfileSportsProvider";


export default function ProfilePage() {
    const {user} = useUser();

    return (
        <Body sidebar>
            <Stack flex={4} direction="row" spacing={2} justifyContent={"space-between"}>
                <ProfileSportsProvider>
                    <ProfileCard user={user}/>
                    <Preferences/>
                </ProfileSportsProvider>
            </Stack>
        </Body>
    );
}