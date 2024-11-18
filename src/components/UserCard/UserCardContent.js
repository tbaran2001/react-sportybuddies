import React, {useEffect} from 'react';
import {Box, CardContent} from '@mui/material';
import {sportsIcons} from "../Pages/UserProfile/sportsIcons";
import {styled} from "@mui/system";
import Tooltip from "@mui/material/Tooltip";

const IconBox = styled(Box)(({theme}) => ({
    fontSize: 40,
}));

export default function UserCardContent({userSports}) {

    return (
        <CardContent>
            <Box display="flex" justifyContent="center">
                {userSports.map(({id, name}) => (
                    <Tooltip key={id} title={name} arrow>
                        <IconBox component={sportsIcons[name] || sportsIcons['default']}/>
                    </Tooltip>
                ))}
            </Box>
        </CardContent>
    );
}
