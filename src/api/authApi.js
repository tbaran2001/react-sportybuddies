import {handleApiResponse} from "./apiUtils";

export const registerUser = async (api, email, password, name, dateOfBirth, gender) => {
    const response = await api.post("/register", {email, password, name, dateOfBirth, gender});
    return response;
};

export const loginUser = async (api, email, password) => {
    const loginResult = await api.login(email, password);
    if (loginResult.ok) {
        const profileResponse = await api.get("/profiles/me");
        return handleApiResponse(profileResponse);
    }
    return null;
};

export const logoutUser = async (api) => {
    await api.logout();
};