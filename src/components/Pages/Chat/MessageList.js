import {
    Box,
    Typography,
    Paper,
    styled
} from "@mui/material";

const MessageContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "sent",
})(({ theme, sent }) => ({
    display: "flex",
    justifyContent: sent ? "flex-end" : "flex-start",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
}));

const Message = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "sent",
})(({ theme, sent }) => ({
    padding: theme.spacing(1, 2),
    maxWidth: "70%",
    backgroundColor: sent ? theme.palette.primary.light : theme.palette.grey[200],
    color: sent ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

const MessageList = ({messages, userId, endRef}) => (
    <Box sx={{flex: 1, overflow: "auto", p: 2}}>
        {messages.map((msg) => (
            <MessageContainer key={msg.id} sent={msg.senderId === userId}>
                <Message sent={msg.senderId === userId}>
                    <Typography>{msg.content}</Typography>
                    <Typography
                        variant="caption"
                        sx={{display: "block", mt: 0.5, opacity: 0.7}}
                    >
                        {msg.createdOn}
                    </Typography>
                </Message>
            </MessageContainer>
        ))}
        <div ref={endRef}/>
    </Box>
);

export default MessageList;