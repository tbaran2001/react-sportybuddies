import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import {Paper} from "@mui/material";
import ProfileCardHeader from "./ProfileCardHeader";
import ProfileCardMedia from "./ProfileCardMedia";
import ProfileCardContent from "./ProfileCardContent";
import ProfileCardActions from "./ProfileCardActions";
import ProfileCardCollapse from "./ProfileCardCollapse";

const StyledPaper = styled(Paper)(({theme}) => ({
    height: '70%',
    maxWidth: '500px',
    margin: 'auto',
    [theme.breakpoints.up('xs')]: {
        width: '65%',
    },
    [theme.breakpoints.up('sm')]: {
        width: '45%',
    },
    [theme.breakpoints.up('md')]: {
        width: '35%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '25%',
    },
}));

export default function ProfileCard({profile, profileSports, distance}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledPaper>
            <Card sx={{backgroundColor: 'primary.main'}}>
                <ProfileCardHeader profile={profile} distance={distance}/>
                <ProfileCardMedia profile={profile}/>
                <ProfileCardContent profileSports={profileSports}/>
                <ProfileCardCollapse expanded={expanded} profile={profile}/>
            </Card>
        </StyledPaper>
    );
}