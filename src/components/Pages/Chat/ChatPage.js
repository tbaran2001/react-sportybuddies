import React, {useState, useRef, useEffect} from "react";
import {
    Box,
    Paper,
    styled
} from "@mui/material";
import Body from "../../Body";
import {useNavigate, useParams} from "react-router-dom";
import {useApi} from "../../../contexts/ApiProvider";
import {
    GetConversation,
    GetConversationMessages, initializeConnection,
    SendMessageToConversation
} from "../../../api/chat";
import {useUser} from "../../../contexts/UserProvider";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import InputBox from "./InputBox";


const StyledPaper = styled(Paper)(({theme}) => ({
    height: "85vh",
    display: "flex",
    overflow: "hidden",
}));

export default function ChatPage() {
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState(null);
    const [conversationMessages, setConversationMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const {conversationId} = useParams();
    const navigate = useNavigate();
    const {user} = useUser();
    const api = useApi();
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const connectionInstance = initializeConnection((msg) => {
            setConversationMessages((prev) => [...prev, msg]);
        });
        setConnection(connectionInstance);

        return () => {
            connectionInstance?.stop();
        };
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const conversationData = await GetConversation(api, conversationId);
                if (!conversationData) {
                    navigate("/UserProfilePage", { replace: true });
                    return;
                }
                setConversation(conversationData);
                const messages = await GetConversationMessages(api, conversationId);
                setConversationMessages(messages);
            } catch (error) {
                console.error("Error fetching conversation or messages:", error);
                navigate("/UserProfilePage", { replace: true }); // Navigate on error
            }
        })();
    }, [api, conversationId, navigate]);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversationMessages]);

    const handleSendMessage = () => {
        (async () => {
            if (message.trim() === "") return;
            if (message.trim()) {
                const newMessage = await SendMessageToConversation(api, conversationId, message);
                setMessage("");
            }
        })();
    };

    const getOtherParticipantName = () => {
        if (!conversation || !conversation.participants) return "--";

        const otherParticipant = conversation.participants.find(
            (participant) => participant.user.id !== user.id
        );
        return otherParticipant?.user?.name || "--";
    };

    return (
        <Body sidebar>
            <Box flex={4}>
                <StyledPaper elevation={10}>
                    <Box sx={{flex: 1, display: "flex", flexDirection: "column"}}>
                        <ChatHeader
                            participantName={getOtherParticipantName()}
                        />
                        <MessageList
                            messages={conversationMessages}
                            userId={user?.id}
                            endRef={messagesEndRef}
                        />
                        <InputBox
                            message={message}
                            setMessage={setMessage}
                            onSendMessage={handleSendMessage}
                        />
                    </Box>
                </StyledPaper>
            </Box>
        </Body>
    );
}