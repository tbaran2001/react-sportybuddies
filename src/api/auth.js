export const registerUser = async (api, email, password) => {
    const data = await api.post("/register", {email, password});
    return data;
};