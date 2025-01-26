import {handleApiResponse} from "./apiUtils";

export const getRandomMatch = async (api) => {
    const response = await api.get("/matches/get-random-match");
    return handleApiResponse(response)?.match;
};

export const swipeMatch = async (api, matchId, direction) => {
    const swipeValue = direction
    const swipePayload = {
        swipe: swipeValue,
        swipeDateTime: new Date().toISOString(),
    };

    await api.put(`/matches/${matchId}`, swipePayload);

    return await getRandomMatch(api);
}