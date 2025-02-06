import React, {useState} from 'react';
import {Button, CardContent, Collapse, TextField, Typography} from '@mui/material';

export default function ProfileCardCollapse({ description }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const [loading, setLoading] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/update-description', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: editedDescription }),
            });

            if (!response.ok) {
                throw new Error('Failed to update description');
            }

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

            {isEditing ? (
                <Button onClick={handleSaveClick} disabled={loading} sx={{ color: 'blue',mt: 1 }}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            ) : (
                <Button onClick={handleEditClick} sx={{ mt: 1 }}>
                    Edit
                </Button>
            )}
        </CardContent>
    );
}
