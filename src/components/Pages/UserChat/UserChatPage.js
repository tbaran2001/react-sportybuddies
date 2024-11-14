import React, {useState, useRef, useEffect} from "react";
import {
    Box,
    Avatar,
    Typography,
    TextField,
    IconButton,
    Badge,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Drawer,
    useTheme,
    useMediaQuery,
    styled
} from "@mui/material";
import {IoSend, IoMenu} from "react-icons/io5";
import {BsCircleFill} from "react-icons/bs";
import Body from "../../Body";

const contacts = [
    {
        id: 1,
        name: "John Doe",
        avatar: "images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        lastMessage: "Hey, how are you?",
        online: true
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "images.unsplash.com/photo-1438761681033-6461ffad8d80",
        lastMessage: "See you tomorrow!",
        online: false
    }
];

const messages = [
    {id: 1, text: "Hi there!", sent: false, timestamp: "09:30 AM"},
    {id: 2, text: "Hello! How are you?", sent: true, timestamp: "09:31 AM"},
    {id: 3, text: "I'm good, thanks for asking!", sent: false, timestamp: "09:32 AM"}
];

const StyledPaper = styled(Paper)(({theme}) => ({
    height: "85vh",
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.main

}));

const MessageContainer = styled(Box)(({theme, sent}) => ({
    display: "flex",
    justifyContent: sent ? "flex-end" : "flex-start",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
}));

const Message = styled(Paper)(({theme, sent}) => ({
    padding: theme.spacing(1, 2),
    maxWidth: "70%",
    backgroundColor: sent ? theme.palette.primary.main : theme.palette.secondary.main,
    color: sent ? theme.palette.text.secondary : theme.palette.text.primary
}));

export default function UserChatPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessage("");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Body sidebar>
            <Box flex={4}>
                <StyledPaper elevation={10}>
                    {isMobile ? (
                        <Drawer
                            variant="temporary"
                            anchor="left"
                            open={mobileOpen}
                            onClose={toggleDrawer}
                            ModalProps={{keepMounted: true}}
                        >
                            {sidebar}
                        </Drawer>
                    ) : (
                        sidebar
                    )}
                    <Box sx={{flex: 1, display: "flex", flexDirection: "column"}}>
                        <Box
                            sx={{
                                p: 2,
                                borderBottom: 1,
                                borderColor: "divider",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            {isMobile && (
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={toggleDrawer}
                                    sx={{mr: 2}}
                                >
                                    <IoMenu/>
                                </IconButton>
                            )}
                            <Avatar
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                                alt="Current chat"
                            />
                            <Box sx={{ml: 2}}>
                                <Typography variant="subtitle1" fontWeight="medium">
                                    John Doe
                                </Typography>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <BsCircleFill
                                        size={8}
                                        style={{color: "#44b700", marginRight: 4}}
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        Online
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                overflow: "auto",
                                p: 2,
                            }}
                        >
                            {messages.map((msg) => (
                                <MessageContainer key={msg.id} sent={msg.sent}>
                                    <Message sent={msg.sent}>
                                        <Typography>{msg.text}</Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{display: "block", mt: 0.5, opacity: 0.7}}
                                        >
                                            {msg.timestamp}
                                        </Typography>
                                    </Message>
                                </MessageContainer>
                            ))}
                            <div ref={messagesEndRef}/>
                        </Box>

                        <Box
                            sx={{
                                p: 2,
                                backgroundColor: "background.primary",
                                borderTop: 1,
                                borderColor: "divider"
                            }}
                        >
                            <Box sx={{display: "flex", alignItems: "flex-end"}}>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type a message"
                                    variant="outlined"
                                    sx={{mr: 1}}
                                />
                                <IconButton
                                    color="primary"
                                    onClick={handleSendMessage}
                                    aria-label="send message"
                                >
                                    <IoSend/>
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </StyledPaper>
            </Box>
        </Body>
    );
};

const sidebar = (
    <Box sx={{width: 320, borderRight: 1, borderColor: "divider", backgroundColor: "primary.main"}}>
        <List sx={{overflow: "auto", maxHeight: "100vh"}}>
            {contacts.map((contact) => (
                <ListItem
                    key={contact.id}
                    button
                    sx={{"&:hover": {backgroundColor: "action.hover"}}}
                >
                    <ListItemAvatar>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                            variant="dot"
                            sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: contact.online ? "#44b700" : "grey",
                                    color: contact.online ? "#44b700" : "grey"
                                }
                            }}
                        >
                            <Avatar src={`https://${contact.avatar}`} alt={contact.name}/>
                        </Badge>
                    </ListItemAvatar>
                    <ListItemText
                        primary={contact.name}
                        secondary={contact.lastMessage}
                        primaryTypographyProps={{fontWeight: "medium"}}
                    />
                </ListItem>
            ))}
        </List>
    </Box>
);
