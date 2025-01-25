import ProfileCard from "./ProfileCard";
import Preferences from "../Pages/Profile/Preferences";
import React from "react";
import {useProfileSports} from "../../contexts/ProfileSportsProvider";

export default function Profile({profile}) {
    const {profileSports} = useProfileSports();

    return (
        <>
            <ProfileCard profile={profile} profileSports={profileSports}/>
            <Preferences/>
        </>
    );
}