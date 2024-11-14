import React from 'react';
import {Box, Checkbox, Grid2, SvgIcon} from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import { styled } from '@mui/system';

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
        fontSize: 40,
    },
}));

const sportsIcons = {
    soccer: SportsSoccerIcon,
    basketball: SportsBasketballIcon,
    tennis: SportsTennisIcon,
    cricket: SportsCricketIcon,
    football: SportsFootballIcon,
};

export default function SportsPicker({ selectedSports, onChange }){
    const handleChange = (sport) => {
        onChange(sport);
    };

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent={"center"}>
            {Object.keys(sportsIcons).map((sport) => {
                const Icon = sportsIcons[sport];
                return (
                    <Box key={sport}>
                        <StyledCheckbox
                            icon={<Icon style={{ color: 'grey' }} />}
                            checkedIcon={<Icon style={{ color: 'green' }}/>}
                            checked={selectedSports.includes(sport)}
                            onChange={() => handleChange(sport)}
                        />
                    </Box>
                );
            })}
        </Box>
    );
};
