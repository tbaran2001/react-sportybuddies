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

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme}) => ({
    margin: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({expand}) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({expand}) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

const StyledPaper = styled(Paper)(({theme}) => ({
    height: '80%',
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

export default function ProfileCard({profile, profileSports}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledPaper>
            <Card sx={{backgroundColor: 'primary.main'}}>
                <ProfileCardHeader profile={profile}/>
                <ProfileCardMedia
                    image={"data:image/png;base64,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"}/>
                <ProfileCardContent profileSports={profileSports}/>
                <ProfileCardActions expanded={expanded} onExpandClick={handleExpandClick}/>
                <ProfileCardCollapse expanded={expanded} description={profile.description}/>
            </Card>
        </StyledPaper>
    );
}