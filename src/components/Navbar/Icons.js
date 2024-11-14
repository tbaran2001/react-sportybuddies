import React from 'react';
import {Box} from "@mui/material";
import {styled} from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountMenu from "./AccountMenu";

const StyledBox = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem"
}));

export default function Icons() {
    return (
        <StyledBox>
            <Badge badgeContent={3} color="error">
                <ChatBubbleIcon/>
            </Badge>
            <Badge badgeContent={5} color="error">
                <NotificationsIcon/>
            </Badge>
            <AccountMenu/>
        </StyledBox>
    );
}
