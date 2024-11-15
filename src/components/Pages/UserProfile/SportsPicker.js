import React, {useEffect, useState} from 'react';
import {Box, Checkbox, Grid2, SvgIcon} from '@mui/material';
import {styled} from '@mui/system';
import {useUser} from "../../../contexts/UserProvider";
import {useApi} from "../../../contexts/ApiProvider";
import {addUserSport, getAllSports, getCurrentUserSports, removeUserSport} from "../../../api/sports";
import {
    AcUnit, DirectionsBike, DirectionsRun, DownhillSkiing,
    FitnessCenter, Hiking, Pool, SelfImprovement,
    Snowboarding,
    SportsBasketball,
    SportsMma,
    SportsSoccer, SportsTennis, SportsVolleyball,
    Surfing
} from "@mui/icons-material";

const StyledCheckbox = styled(Checkbox)(({theme}) => ({
    '& .MuiSvgIcon-root': {
        fontSize: 40,
    },
}));

const sportsIcons = {
    Gym: FitnessCenter,
    Badminton: AcUnit,
    Boxing: SportsMma,
    Football: SportsSoccer,
    Climbing: AcUnit,
    Surfing: Surfing,
    Basketball: SportsBasketball,
    Snowboarding: Snowboarding,
    Hiking: Hiking,
    Yoga: SelfImprovement,
    Volleyball: SportsVolleyball,
    Cycling: DirectionsBike,
    Swimming: Pool,
    Dance: AcUnit,
    Tennis: SportsTennis,
    "Table Tennis": AcUnit,
    Running: DirectionsRun,
    "Martial Arts": AcUnit,
    Skiing: DownhillSkiing,
    Pilates: AcUnit,
};

export default function SportsPicker({userSports, handleSportsChange}) {
    const api = useApi();
    const [allSports, setAllSports] = useState([]);

    useEffect(() => {
        const fetchSports = async () => {
            const sports = await getAllSports(api);
            setAllSports(sports);
        };
        fetchSports();
    }, [api]);


    return (
        <Box>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
                {allSports.map((sport) => {
                    const SportIcon = sportsIcons[sport.name] || FitnessCenter;
                    return (
                        <Box key={sport.id}>
                            <StyledCheckbox
                                checked={userSports.some((s) => s.id === sport.id)}
                                onChange={() => handleSportsChange(sport)}
                                icon={<SportIcon />}
                                checkedIcon={<SportIcon />}
                            />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};
