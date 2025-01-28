import React, {useEffect, useState} from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';

export default function GenderSelect({gender, onChange}) {
    const [value, setValue] = useState(gender);

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <Box m={2}>
            <Typography>Szukam</Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                    labelId="gender-select-label"
                    value={value}
                    onChange={handleChange}
                    label="Gender"
                >
                    <MenuItem value={3}>Wszyscy</MenuItem>
                    <MenuItem value={1}>Mężczyzn</MenuItem>
                    <MenuItem value={2}>Kobiety</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
