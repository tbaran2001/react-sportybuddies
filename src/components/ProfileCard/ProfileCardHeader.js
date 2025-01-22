import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ProfileCardHeader({ user }) {
    return (
        <CardHeader
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
            sx={{ textAlign: 'center' }}
            title={
                <Typography variant="h6" component="div">
                    {user.name}
                </Typography>
            }
            subheader={
                <Box>
                    <Typography variant="subtitle1" component="div">
                        15 km
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {user.dateOfBirth}
                    </Typography>
                </Box>
            }
        />
    );
}
