import React from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useUser} from "../../contexts/UserProvider";

export default function ProfileCardHeader({profile, distance}) {
    const {user} = useUser();

    const calculateAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    };

    const formatDistance = (distance) => {
        return `${Math.max(1, Math.round(distance))} km`;
    };

    return (
        <CardHeader
            action={user.id === profile.id && (
                <IconButton aria-label="settings">
                    <MoreVertIcon/>
                </IconButton>
            )}
            sx={{textAlign: 'center'}}
            title={
                <Typography variant="h6" component="div">
                    {profile.name}, {calculateAge(profile.dateOfBirth)}l
                </Typography>
            }
            subheader={
                <Box>
                    <Typography variant="subtitle1" component="div">
                        {profile.location?.address && <span>{profile.location.address} </span>}

                        {distance !== undefined && user.id !== profile.id && (
                            <span>, {formatDistance(distance)}</span>
                        )}
                    </Typography>
                </Box>
            }
        />
    );
}
