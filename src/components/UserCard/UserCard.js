import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import {Paper} from "@mui/material";
import UserCardHeader from "./UserCardHeader";
import UserCardMedia from "./UserCardMedia";
import UserCardContent from "./UserCardContent";
import UserCardActions from "./UserCardActions";
import UserCardCollapse from "./UserCardCollapse";

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

const StyledPaper = styled(Paper)(({ theme }) => ({
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

export default function UserCard({user,userSports, isCurrentUser}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledPaper>
            <Card sx={{backgroundColor: 'primary.main'}}>
                <UserCardHeader user={user} />
                <UserCardMedia image={"https://images.pexels.com/photos/22873652/pexels-photo-22873652/free-photo-of-filizanka-kawy-z-lyzeczka.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} />
                <UserCardContent userSports={userSports}/>
                <UserCardActions expanded={expanded} onExpandClick={handleExpandClick} />
                <UserCardCollapse expanded={expanded} description={user.description} />
            </Card>
        </StyledPaper>
    );
}