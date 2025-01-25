import React, {useEffect, useState} from 'react';
import {CircularProgress, Stack, Typography} from "@mui/material";
import Body from "../../Body";
import {useUser} from "../../../contexts/UserProvider";
import {ProfileSportsProvider} from "../../../contexts/ProfileSportsProvider";
import Profile from "../../ProfileCard/Profile";
import {useApi} from "../../../contexts/ApiProvider";
import {updateProfileLocation} from "../../../api/profileApi";


export default function ProfilePage() {
    const {user} = useUser();
    const api = useApi();

    useEffect(() => {
        const requestUserLocation = async () => {
            if (user?.location?.latitude && user?.location?.longitude) {
                console.log("User's location is already set:", user.location);
                return;
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const {latitude, longitude} = position.coords;
                        console.log("User's location:", latitude, longitude);

                        await updateProfileLocation(api, latitude, longitude);
                    },
                    (error) => {
                        console.error("Error getting location:", error.message);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };

        requestUserLocation();
    }, [api]);

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