export const getRandomMatch = async (api) => {
    const response = await api.get("/matches/get-random-match");
    return response.ok ? response.body : null;
};

export const swipeMatch = async (api, matchId, direction) => {
    const response = await api.put("/matches/" + matchId, {
        swipe: direction === "right" ? 1 : 2,
    });

    if (response.ok) {
        const response = await api.get("/matches/random");
        return response.ok ? response.body : null;
    }
}