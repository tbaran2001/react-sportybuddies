import React from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useUser} from "../../contexts/UserProvider";

export default function ProfileCardHeader({profile}) {
    const {user} = useUser();
    return (
        <CardHeader
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon/>
                </IconButton>
            }
            sx={{textAlign: 'center'}}
            title={
                <Typography variant="h6" component="div">
                    {profile.name}
                </Typography>
            }
            subheader={
                <Box>
                    <Typography variant="subtitle1" component="div">
                        15 km
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {profile.dateOfBirth}
                    </Typography>
                </Box>
            }
        />
    );
}
