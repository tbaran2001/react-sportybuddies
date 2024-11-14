import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import SportsPicker from "./SportsPicker";

export default function SportsForm() {
    const [selectedSports, setSelectedSports] = useState([]);

    const handleSportsChange = (sport) => {
        setSelectedSports((prev) =>
            prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
        );
    };
    return (
        <Box sx={{padding: 3,margin: 'auto'}}>
            <Typography variant="h3" align={"center"}>
                Choose your sports
            </Typography>
            <SportsPicker selectedSports={selectedSports} onChange={handleSportsChange} />
        </Box>
    );
}
