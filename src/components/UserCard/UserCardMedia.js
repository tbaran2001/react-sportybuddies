import React from 'react';
import CardMedia from '@mui/material/CardMedia';

export default function UserCardMedia({ image }) {
    return (
        <CardMedia
            component="img"
            height="10%"
            image={image}
            alt="User Profile Picture"
        />
    );
}
