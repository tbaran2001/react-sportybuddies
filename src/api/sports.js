export const getAllSports = async (api) => {
    const response = await api.get("/sports/all");
    return response.ok ? response.body : null;
};

export const getCurrentUserSports = async (api) => {
    const response = await api.get("/sports");
    return response.ok ? response.body : null;
};

export const addUserSport = async (api, sportId) => {
    const response = await api.post("/sports/" + sportId);
    return !!response.ok;
}

export const removeUserSport = async (api, sportId) => {
    const response = await api.delete("/sports/" + sportId);
    return !!response.ok;
}