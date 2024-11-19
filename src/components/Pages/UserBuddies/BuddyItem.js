import React, {memo} from "react";
import {Avatar, Button, ListItem, ListItemAvatar, ListItemText, Typography, useTheme} from "@mui/material";
import {styled} from "@mui/system";
import {IoMdSend} from "react-icons/io";
import {Link, useNavigate} from "react-router-dom";
import {CreateConversation} from "../../../api/chat";
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
            let conversationId = buddy.conversation?.id;

            if (!conversationId) {
                const newConversation = await CreateConversation(api,buddy.matchedUser.id);
                conversationId = newConversation.id;
            }

            navigate(`/UserChatPage/${conversationId}`);
        } catch (error) {
            console.error("Failed to create or navigate to conversation:", error);
        }
    };

    return (
        <StyledListItem>
            <ListItemAvatar
                alignItems="center"
                role="listitem"
                aria-label={`Buddy ${buddy.matchedUser.name}`}
                sx={{
                    borderRadius: theme.spacing(1),
                    transition: "background-color 0.2s ease",
                    "&:hover": {backgroundColor: "rgba(0, 0, 0, 0.04)"},
                }}
            >
                <Avatar
                    alt={buddy.matchedUser.name}
                    src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb`}
                    sx={{width: 60, height: 60}}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="h6" sx={{fontWeight: "medium"}}>
                        {buddy.matchedUser.name}
                    </Typography>
                }
                secondary={
                    <Typography variant="body2" color="text.secondary">
                        {buddy.matchedUser.description}
                    </Typography>
                }
                sx={{ml: 2}}
            />
            <StyledButton
                variant="contained"
                color="primary"
                startIcon={<IoMdSend />}
                onClick={handleButtonClick}
                aria-label={`Start or go to conversation with ${buddy.matchedUser.name}`}
            >
                Start Chat
            </StyledButton>
        </StyledListItem>
    );
});