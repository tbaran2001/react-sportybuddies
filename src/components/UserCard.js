import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserSports from "./UserSports";
import {Box, Paper} from "@mui/material";

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

export default function UserCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Paper flex={3} sx={{
            width: {xs: '65%', sm: '45%', md: '35%', lg: '25%'},
            height: '100%',
            maxWidth: '500px',
            margin: 'auto',
        }} elevation={24} variant="outlined">
            <Card sx={{backgroundColor: 'primary.main'}}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    sx={{textAlign: 'center'}}
                    title={
                        <Typography variant="h6" component="div">
                            User Name
                        </Typography>
                    }
                    subheader={
                        <Box>
                            <Typography variant="subtitle1" component="div">
                                15 km
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                22y
                            </Typography>
                        </Box>
                    }
                />
                <CardMedia
                    component="img"
                    height="10%"
                    image="https://randomuser.me/api/portraits/men/31.jpg"
                    alt="User Profile Picture"
                />
                <CardContent>
                    <Box display="flex" justifyContent="center">
                        <UserSports/>
                    </Box>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography sx={{marginBottom: 2}}>About me:</Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
                            ista
                            probare, quae sunt a te dicta? Refert tamen, quo modo. Quod cum dixissent, ille contra. Quae
                            cum
                            dixisset paulumque institisset, Quid est? Duo Reges: constructio interrete. Quae cum essent
                            dicta,
                            discessimus. Quod quidem nobis non saepe contingit. Quamquam tu hanc copiosiorem etiam soles
                            dicere. Quae cum dixisset paulumque institisset, Quid est? Duo Reges: constructio interrete.
                            Quae
                            cum essent dicta, discessimus. Quod quidem nobis non saepe contingit. Quamquam tu hanc
                            copiosiorem
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Paper>
    );
}