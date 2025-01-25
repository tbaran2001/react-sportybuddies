import {handleApiResponse} from "./apiUtils";

export const getAllSports = async (api) => {
    const response = await api.get("/sports");
    return handleApiResponse(response)?.sports || [];
};

export const getCurrentProfileSports = async (api) => {
    const response = await api.get("/profiles/me");
    return handleApiResponse(response)?.profile.sports;
};

export const addProfileSport = async (api, sportId) => {
    const response = await api.post(`/profiles/sports/${sportId}`);
    return response.ok;
}

export const removeProfileSport = async (api, sportId) => {
    const response = await api.delete(`/profiles/sports/${sportId}`);
    return response.ok;
}