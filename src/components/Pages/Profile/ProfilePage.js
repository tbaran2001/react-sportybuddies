import React from 'react';
import {Stack} from "@mui/material";
import Body from "../../Body";
import {useUser} from "../../../contexts/UserProvider";
import {ProfileSportsProvider} from "../../../contexts/ProfileSportsProvider";
import Profile from "../../ProfileCard/Profile";


export default function ProfilePage() {
    const {user} = useUser();

    return (
        <Body sidebar>
            <Stack flex={4} direction="row" spacing={2} justifyContent={"space-between"}>
                <ProfileSportsProvider>
                    <Profile profile={user}/>
                </ProfileSportsProvider>
            </Stack>
        </Body>
    );
}