import React, {useEffect} from 'react';
import {Box, CardContent} from '@mui/material';
import {sportsIcons} from "../Pages/Profile/sportsIcons";
import {styled} from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import {useProfileSports} from "../../contexts/ProfileSportsProvider";

const IconBox = styled(Box)(({theme}) => ({
    fontSize: 40,
}));

export default function ProfileCardContent() {
    const {profileSports} = useProfileSports();

    return (
        <CardContent>
            <Box display="flex" justifyContent="center">
                {profileSports.map(({id, name}) => (
                    <Tooltip key={id} title={name} arrow>
                        <IconBox component={sportsIcons[name] || sportsIcons['default']}/>
                    </Tooltip>
                ))}
            </Box>
        </CardContent>
    );
}
