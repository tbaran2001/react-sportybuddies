import * as signalR from "@microsoft/signalr";
import { toast } from "react-toastify";

// Initializes the SignalR connection
export const initializeConnection = (onMessageReceived) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:8080/chathub")
        .build();

    connection
        .start()
        .then(() => {
            console.log("Connection started!");
            connection.on("ReceiveMessage", onMessageReceived);
        })
        .catch((error) => {
            console.error("Connection error:", error);
        });

    return connection;
};

// Fetches messages for a specific buddy
export const fetchMessages = async (api, buddyId) => {
    try {
        const response = await api.get(`/messages/${buddyId}`);
        return response.ok ? response.body : null;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
    }
};

// Sends a message to a specific buddy
export const sendMessage = async (api, buddyId, content) => {
    try {
        const response = await api.post(`/messages/${buddyId}`, { content });
        if (!response.ok) {
            toast.error("Message not sent");
        }
    } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Message not sent");
    }
};

export const GetConversation= async (api,conversationId) => {
    try {
        const response = await api.get(`/conversations/${conversationId}`);
        return response.ok ? response.body : null;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
    }
}

export const GetConversationMessages= async (api,conversationId) => {
    try {
        const response = await api.get(`/conversations/${conversationId}/messages`);
        return response.ok ? response.body : null;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
    }
}

export const SendMessageToConversation= async (api,conversationId, content) => {
    try {
        const response = await api.post(`/conversations/${conversationId}/messages`, { content });
        return response.ok ? response.body : null;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
    }
}


export const GetConversationsWithLastMessage= async (api) => {
    try {
        const response = await api.get(`/conversations/LastMessages`);
        return response.ok ? response.body : null;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
    }
}