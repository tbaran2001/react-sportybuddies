export const getCurrentProfile = async (api) => {
    if (api.isAuthenticated()) {
        const response = await api.get("/profiles/me");
        return response.ok ? response.body.profile : null;
    }
    return null;
};

export const getUser = async (api,userId) => {
    const response = await api.get("/profiles/" + userId);
    return response.ok ? response.body : null;
};

export const loginUser = async (api, email, password) => {
    const result = await api.login(email, password);
    if (result.ok === true) {
        const response = await api.get("/profiles/me");
        return response.ok ? response.body : null;
    }
    return null;
};

export const logoutUser = async (api) => {
    await api.logout();
};

export const updateProfilePreferences = async (api, minAge, maxAge, maxDistance, gender) => {
    const response = await api.put("/profiles/preferences", {
        minAge: minAge,
        maxAge: maxAge,
        maxDistance: maxDistance,
        gender: gender,
    });
    return response.ok;
};