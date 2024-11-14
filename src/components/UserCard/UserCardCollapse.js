import React from 'react';
import { CardContent, Collapse, Typography } from '@mui/material';

export default function UserCardCollapse({ expanded, description }) {
    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography sx={{ marginBottom: 2 }}>About me:</Typography>
                <Typography>{description}</Typography>
            </CardContent>
        </Collapse>
    );
}
