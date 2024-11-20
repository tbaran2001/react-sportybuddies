export const registerUser = async (api, email, password, name, dateOfBirth, gender) => {
    const data = await api.post("/register", {email, password, name, dateOfBirth, gender});
    return data;
};