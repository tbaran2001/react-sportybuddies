import React from 'react';
import CardMedia from '@mui/material/CardMedia';

export default function ProfileCardMedia({ image }) {
    return (
        <CardMedia
            component="img"
            image={image}
            alt="User Profile Picture"
        />
    );
}
