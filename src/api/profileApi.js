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

export const updateProfilePreferences = async (api, minAge, maxAge, maxDistance, preferredGender) => {
    const response = await api.put("/profiles/preferences",
        {minAge, maxAge, maxDistance, preferredGender});
    return response.ok;
};

export const updateProfileLocation = async (api, latitude, longitude, address) => {
    const response = await api.put("/profiles/location", {latitude, longitude, address});
    return response.ok;
}

export const uploadProfilePhoto = async (api, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/profiles/upload-profile-photo", formData);
    return handleApiResponse(response);
}

export const updateProfileDescription = async (api, profile, description) => {
    const name = profile.name;
    const gender = profile.gender;
    const dateOfBirth = profile.dateOfBirth;
    const response = await api.put("/profiles/me", {name, description, gender, dateOfBirth});
    return response.ok;
}