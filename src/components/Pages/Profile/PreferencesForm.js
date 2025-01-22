import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import AgeRangeSlider from './AgeRangeSlider';
import DistanceSlider from './DistanceSlider';
import GenderSelect from './GenderSelect';
import { useUser } from '../../../contexts/ProfileProvider';

export default function PreferencesForm() {
    const { user, updatePreferences } = useUser();
    const { minAge = 18, maxAge = 100, maxDistance = 50, gender = 0 } = user.preferences || {};

    const [ageRange, setAgeRange] = useState([minAge, maxAge]);
    const [distance, setDistance] = useState(maxDistance);
    const [selectedGender, setSelectedGender] = useState(gender);

    const handleSubmit = () => {
        updatePreferences(ageRange[0], ageRange[1], distance, selectedGender);
    };

    return (
        <Box sx={{ padding: 3, maxWidth: 400, margin: 'auto' }}>
            <AgeRangeSlider
                minAge={ageRange[0]}
                maxAge={ageRange[1]}
                onChange={(newRange) => setAgeRange(newRange)}
            />
            <DistanceSlider
                maxDistance={distance}
                onChange={(newDistance) => setDistance(newDistance)}
            />
            <GenderSelect
                gender={selectedGender}
                onChange={(newGender) => setSelectedGender(newGender)}
            />
            <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={handleSubmit}
            >
                Save Preferences
            </Button>
        </Box>
    );
}
