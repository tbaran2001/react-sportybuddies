import React, {memo} from "react";
import {Avatar, Button, ListItem, ListItemAvatar, ListItemText, Typography, useTheme} from "@mui/material";
import {styled} from "@mui/system";
import {IoMdSend} from "react-icons/io";
import {Link, useNavigate} from "react-router-dom";
import {CreateConversation} from "../../../api/conversationApi";
import {useApi} from "../../../contexts/ApiProvider";


const StyledButton = styled(Button)(({theme}) => ({
    borderRadius: theme.spacing(3),
    textTransform: "none",
    padding: theme.spacing(1, 3),
}));


const StyledListItem = styled(ListItem)(({theme}) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    transition: "background-color 0.2s ease",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)"
    }
}));

export const BuddyItem = memo(({buddy}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const api = useApi();

    const handleButtonClick = async () => {
        try {
            let conversationId = buddy.conversationId;

            if (!conversationId) {
                const newConversation = await CreateConversation(api,buddy.matchedProfile.id);
                if(!newConversation) {
                    console.error("Failed to create conversation");
                    window.location.reload();
                    return;
                }
                conversationId = newConversation.id;
            }

            if (!conversationId) {
                console.error("Invalid conversation ID");
                navigate("/ProfilePage");
                return;
            }

            navigate(`/ChatPage/${conversationId}`);
        } catch (error) {
            console.error("Failed to create or navigate to conversation:", error);
        }
    };

    return (
        <StyledListItem>
            <ListItemAvatar
                alignItems="center"
                role="listitem"
                aria-label={`Buddy ${buddy.matchedProfile.name}`}
                sx={{
                    borderRadius: theme.spacing(1),
                    transition: "background-color 0.2s ease",
                    "&:hover": {backgroundColor: "rgba(0, 0, 0, 0.04)"},
                }}
            >
                <img
                    src={buddy.matchedProfile.mainPhotoUrl}
                    alt={buddy.matchedProfile.name}
                    style={{width: 60, height: 60, borderRadius: theme.spacing(1), objectFit: "cover"}}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="h6" sx={{fontWeight: "medium"}}>
                        {buddy.matchedProfile.name}
                    </Typography>
                }
                secondary={
                    <Typography variant="body2" color="text.secondary">
                        {buddy.matchedProfile.description}
                    </Typography>
                }
                sx={{ml: 2}}
            />
            <StyledButton
                variant="contained"
                color="primary"
                startIcon={<IoMdSend />}
                onClick={handleButtonClick}
                aria-label={`Start or go to conversation with ${buddy.matchedProfile.name}`}
            >
                Chat
            </StyledButton>
        </StyledListItem>
    );
});