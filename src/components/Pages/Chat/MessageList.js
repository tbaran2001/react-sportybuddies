import {
    Box,
    Typography,
    Paper,
    styled
} from "@mui/material";
import {format} from "date-fns";
import {pl} from "date-fns/locale";

const MessageContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "sent",
})(({theme, sent}) => ({
    display: "flex",
    justifyContent: sent ? "flex-end" : "flex-start",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
}));

const Message = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "sent",
})(({theme, sent}) => ({
    padding: theme.spacing(1, 2),
    maxWidth: "70%",
    backgroundColor: sent ? theme.palette.primary.light : theme.palette.primary.light[800],
    color: sent ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

const MessageList = ({messages, userId, endRef}) => {
    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), "d MMMM yyyy, HH:mm");
        } catch (error) {
            console.error(error);
            return dateString;
        }
    };

    return (
        <Box sx={{flex: 1, overflow: "auto", p: 2}}>
            {messages.map((msg) => (
                <MessageContainer key={msg.id} sent={msg.senderId === userId}>
                    <Message sent={msg.senderId === userId}>
                        <Typography>{msg.content}</Typography>
                        <Typography
                            variant="caption"
                            sx={{display: "block", mt: 0.5, opacity: 0.7}}
                        >
                            {formatDate(msg.createdOn)}
                        </Typography>
                    </Message>
                </MessageContainer>
            ))}
            <div ref={endRef}/>
        </Box>
    );
};

export default MessageList;
