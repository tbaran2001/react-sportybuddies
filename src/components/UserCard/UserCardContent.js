import React from 'react';
import { Box, CardContent } from '@mui/material';
import UserSports from './UserSports';

export default function UserCardContent() {
    return (
        <CardContent>
            <Box display="flex" justifyContent="center">
                <UserSports />
            </Box>
        </CardContent>
    );
}
