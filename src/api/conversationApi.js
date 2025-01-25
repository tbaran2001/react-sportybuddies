import * as signalR from "@microsoft/signalr";
import {handleApiResponse} from "./apiUtils";

export const initializeConnection = (onMessageReceived) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5001/chathub")
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

export const CreateConversation = async (api, userId) => {
    const response = await api.post("/conversations", {participantId: userId});
    return handleApiResponse(response);
}

export const GetConversation = async (api, conversationId) => {
    const response = await api.get(`/conversations/${conversationId}`);
    return handleApiResponse(response);
}

export const GetConversationMessages = async (api, conversationId) => {
    const response = await api.get(`/conversations/${conversationId}/messages`);
    return handleApiResponse(response);
}

export const SendMessageToConversation = async (api, conversationId, content) => {
    const response = await api.post(`/conversations/${conversationId}/messages`, {content});
    return handleApiResponse(response);
}