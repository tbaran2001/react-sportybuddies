import React, {useEffect} from 'react';
import {Box, CardContent} from '@mui/material';
import {
    AcUnit, DirectionsBike, DirectionsRun, DownhillSkiing,
    FitnessCenter, Hiking, Pool, SelfImprovement,
    Snowboarding,
    SportsBasketball,
    SportsMma,
    SportsSoccer, SportsTennis, SportsVolleyball,
    Surfing
} from "@mui/icons-material";


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

export default function UserCardContent({userSports}) {


    return (
        <CardContent>
            <Box display="flex" justifyContent="center">
                {userSports.map(sport => {
                        const Icon = sportsIcons[sport.name];
                        return <Icon key={sport.id} sx={{fontSize: 40}}/>
                    }
                )}
            </Box>
        </CardContent>
    );
}
