import React from 'react';
import { CardContent, Collapse, Typography } from '@mui/material';

export default function ProfileCardCollapse({ expanded, description }) {
    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography sx={{ marginBottom: 2 }}>Opis:</Typography>
                <Typography>{description}</Typography>
            </CardContent>
        </Collapse>
    );
}
