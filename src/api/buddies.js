export const getBuddies = async (api) => {
    const response = await api.get("/buddies");

    return response.ok ? response.body : null;
};