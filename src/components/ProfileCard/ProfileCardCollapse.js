import React, {useState} from 'react';
import {Button, CardContent, Collapse, TextField, Typography} from '@mui/material';
import {useUser} from "../../contexts/UserProvider";
import {useApi} from "../../contexts/ApiProvider";
import {updateProfileDescription} from "../../api/profileApi";

export default function ProfileCardCollapse({profile}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(profile.description);
    const [loading, setLoading] = useState(false);
    const {user} = useUser();
    const api = useApi();

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setLoading(true);
        try {
            await updateProfileDescription(api, profile, editedDescription);

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating description:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CardContent>
            {isEditing ? (
                <TextField
                    fullWidth
                    variant="outlined"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    multiline
                />
            ) : (
                <Typography>{editedDescription}</Typography>
            )}
            {user.id === profile.id && (
                isEditing ? (
                    <Button variant="contained" onClick={handleSaveClick} disabled={loading}
                            sx={{bgcolor: '#162c46', mt: 1}}>
                        {loading ? 'Zapisywanie...' : 'Zapisz opis'}
                    </Button>
                ) : (
                    <Button variant="contained" onClick={handleEditClick} sx={{bgcolor: '#162c46', mt: 1}}>
                        Edit Description
                    </Button>
                )
            )}
        </CardContent>
    );
}
