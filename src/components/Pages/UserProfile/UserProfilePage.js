import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import UserCard from "../../UserCard/UserCard";
import Preferences from "./Preferences";
import Body from "../../Body";
import {useUser} from "../../../contexts/UserProvider";
import {addUserSport, getAllSports, getCurrentUserSports, removeUserSport} from "../../../api/sports";
import {useApi} from "../../../contexts/ApiProvider";


export default function UserProfilePage() {
    const {user}=useUser();

    const api = useApi();
    const [userSports, setUserSports] = useState([]);

    useEffect(() => {
        const fetchUserSports = async () => {
            const sports = await getCurrentUserSports(api);
            setUserSports(sports);
        }
        fetchUserSports();
    }, [api]);

    const handleSportsChange = async (sport) => {
        if (userSports.some((s) => s.id === sport.id)) {
            const success = await removeUserSport(api, sport.id);
            if (success) {
                setUserSports((prev) => prev.filter((s) => s.id !== sport.id));
            }
        } else {
            const success = await addUserSport(api, sport.id);
            if (success) {
                setUserSports((prev) => [...prev, sport]);
            }
        }
    };

    return (
        <Body sidebar>
            <Stack flex={4} direction="row" spacing={2} justifyContent={"space-between"}>
                <UserCard user={user} userSports={userSports} isCurrentUser/>
                <Preferences userSports={userSports} handleSportsChange={handleSportsChange}/>
            </Stack>
        </Body>
    );
}