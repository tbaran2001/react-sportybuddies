import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const marks = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 100,
        label: '100',
    },
];

export default function DistanceSlider({maxDistance, onChange}) {
    const [value, setValue] = React.useState(maxDistance);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        onChange(newValue);
    };

    const handleInputChange = (event) => {
        let newValue = Number(event.target.value);
        if (newValue < 1) newValue = 1;
        if (newValue > 100) newValue = 100;
        setValue(newValue);
        onChange(newValue);
    };

    const handleBlur = () => {
        if (value < 1) setValue(1);
        if (value > 100) setValue(100);
        onChange(value);
    };

    return (
        <Box m={2}>
            <Typography gutterBottom>Preferowana odległość</Typography>
            <Slider
                getAriaLabel={() => 'Distance slider'}
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={1}
                max={100}
                marks={marks}
            />
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 1}}>
                <TextField
                    label="Km"
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    type="number"
                    InputProps={{inputProps: {min: 1, max: 100}}}
                    variant="outlined"
                    fullWidth
                />
            </Box>
        </Box>
    );
}
