import {handleApiResponse} from "./apiUtils";

export const getCurrentProfile = async (api) => {
    if (api.isAuthenticated()) {
        const response = await api.get("/profiles/me");
        return handleApiResponse(response)?.profile || null;
    }
    return null;
};

export const getUser = async (api, userId) => {
    const response = await api.get(`/profiles/${userId}`);
    return handleApiResponse(response);
};

export const updateProfilePreferences = async (api, minAge, maxAge, maxDistance, gender) => {
    const response = await api.put("/profiles/preferences",
        {minAge, maxAge, maxDistance, gender});
    return response.ok;
};