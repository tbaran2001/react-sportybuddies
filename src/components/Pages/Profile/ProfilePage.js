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

    const fetchLocationName = async (latitude, longitude) => {
        const API_KEY = process.env.GOOGLE_API_KEY;
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

        try {
            const response = await fetch(geocodeUrl);
            const data = await response.json();

            if (data.status === "OK") {
                const addressComponents = data.results[0]?.address_components;
                if (addressComponents) {
                    const city = addressComponents.find((component) =>
                        component.types.includes("locality")
                    )?.long_name;

                    console.log("City Name:", city);
                    return city;
                } else {
                    console.error("No address components found.");
                    return null;
                }
            } else {
                console.error("Geolocation Error:", data.status);
                return null;
            }
        } catch (error) {
            console.error("Cannot connect to API:", error.message);
            return null;
        }
    };

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

                        const address = await fetchLocationName(latitude, longitude);

                        await updateProfileLocation(api, latitude, longitude, address);
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