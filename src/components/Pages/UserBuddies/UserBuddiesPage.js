import React, {useState} from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
    Paper,
    useTheme,
} from "@mui/material";
import {styled} from "@mui/system";
import {IoMdSend} from "react-icons/io";
import Body from "../../Body";

const buddiesData = [
    {
        id: 1,
        name: "Sarah Johnson",
        description: "I am looking for a tennis partner. Let's play!",
        avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
        id: 2,
        name: "Michael Chen",
        description: "I am looking for a tennis partner. Let's play!",
        avatar: "images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
        id: 3,
        name: "Emma Williams",
        description: "I am looking for a tennis partner. Let's play!",
        avatar: "images.unsplash.com/photo-1534528741775-53994a69daeb"
    }
];

const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({theme}) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    transition: "background-color 0.2s ease",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)"
    }
}));

const StyledButton = styled(Button)(({theme}) => ({
    borderRadius: theme.spacing(3),
    textTransform: "none",
    padding: theme.spacing(1, 3)
}));

export default function UserBuddiesPage() {
    const theme = useTheme();

    return (
        <Body sidebar>
            <Box flex={4}>
                <StyledPaper>
                    <Typography variant="h4" gutterBottom sx={{fontWeight: "bold", color: theme.palette.text.primary}}>
                        My Buddies
                    </Typography>
                    <List>
                        {buddiesData.map((buddy) => (
                            <StyledListItem
                                key={buddy.id}
                                alignItems="center"
                                role="listitem"
                                aria-label={`Buddy ${buddy.name}`}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt={buddy.name}
                                        src={`https://${buddy.avatar}`}
                                        sx={{width: 60, height: 60}}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" sx={{fontWeight: "medium"}}>
                                            {buddy.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            {buddy.description}
                                        </Typography>
                                    }
                                    sx={{ml: 2}}
                                />
                                <StyledButton
                                    variant="contained"
                                    color="primary"
                                    startIcon={<IoMdSend/>}
                                    onClick={() => console.log(`Send message to ${buddy.name}`)}
                                    aria-label={`Send message to ${buddy.name}`}
                                >
                                    Send Message
                                </StyledButton>
                            </StyledListItem>
                        ))}
                    </List>
                </StyledPaper>
            </Box>
        </Body>
    );
};
