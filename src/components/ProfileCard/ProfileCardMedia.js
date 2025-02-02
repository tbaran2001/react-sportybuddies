import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import {Box, IconButton} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import {useApi} from "../../contexts/ApiProvider";
import {useUser} from "../../contexts/UserProvider";
import {uploadProfilePhoto} from "../../api/profileApi";

export default function ProfileCardMedia({profile}) {
    const api = useApi();
    const {user} = useUser();
    const defaultPhotoUrl = '/photo.png';

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const response = await uploadProfilePhoto(api, file);
            if (response) {
                window.location.reload();
            }
        }
    };

    return (
        <Box style={{position: 'relative', textAlign: 'center'}}>
            <CardMedia
                component="img"
                image={profile.mainPhotoUrl || defaultPhotoUrl}
                alt="User Profile Picture"
            />
            {user.id === profile.id && (
                <>
                    <input
                        accept="image/*"
                        type="file"
                        style={{display: 'none'}}
                        id="upload-photo"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="upload-photo">
                        <IconButton
                            color="primary"
                            component="span"
                            style={{position: 'absolute', top: 16, right: 16}}
                        >
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                </>
            )}
        </Box>
    );
}
