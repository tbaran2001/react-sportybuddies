export const getCurrentUser = async (api) => {
    if (api.isAuthenticated()) {
        const response = await api.get("/users");
        return response.ok ? response.body : null;
    }
    return null;
};

export const getUser = async (api,userId) => {
    const response = await api.get("/users/" + userId);
    return response.ok ? response.body : null;
};

export const loginUser = async (api, email, password) => {
    const result = await api.login(email, password);
    if (result.ok === true) {
        const response = await api.get("/users");
        return response.ok ? response.body : null;
    }
    return null;
};

export const logoutUser = async (api) => {
    await api.logout();
};

export const updateUserPreferences = async (api, minAge,maxAge,maxDistance,gender) => {
    const response = await api.put("/users/preferences", {
        minAge: minAge,
        maxAge: maxAge,
        maxDistance: maxDistance,
        gender: gender,
    });
    return response.ok;
};