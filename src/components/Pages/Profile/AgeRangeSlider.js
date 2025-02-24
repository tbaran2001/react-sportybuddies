import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {TextField, Typography} from "@mui/material";

const marks = [
    {
        value: 18,
        label: '18',
    },
    {
        value: 120,
        label: '120',
    },
];


export default function AgeRangeSlider({minAge, maxAge, onChange}) {
    const [value, setValue] = React.useState([minAge, maxAge]);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        onChange(newValue);
    };

    const handleInputChange = (index) => (event) => {
        const newValue = [...value];
        newValue[index] = Number(event.target.value);

        if (newValue[0] < 18) newValue[0] = 18;
        if (newValue[1] > 120) newValue[1] = 120;
        if (newValue[0] > newValue[1]) newValue[index === 0 ? 1 : 0] = newValue[index];
        setValue(newValue);
        onChange(newValue);
    };

    const handleBlur = () => {
        if (value[0] < 18) setValue([18, value[1]]);
        if (value[1] > 120) setValue([value[0], 120]);
        onChange(value);
    };

    return (
        <Box m={2}>
            <Typography gutterBottom>Preferred age</Typography>
            <Slider
                getAriaLabel={() => 'Age range slider'}
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={18}
                max={120}
                marks={marks}
            />
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 1}}>
                <TextField
                    label="Min"
                    value={value[0]}
                    onChange={handleInputChange(0)}
                    onBlur={handleBlur}
                    type="number"
                    InputProps={{inputProps: {min: 18, max: 120}}}
                    variant="outlined"
                />
                <TextField
                    label="Max"
                    value={value[1]}
                    onChange={handleInputChange(1)}
                    onBlur={handleBlur}
                    type="number"
                    InputProps={{inputProps: {min: 18, max: 120}}}
                    variant="outlined"
                />
            </Box>
        </Box>
    );
}