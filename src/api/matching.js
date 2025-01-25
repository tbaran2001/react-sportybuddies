import {handleApiResponse} from "./apiUtils";

export const getRandomMatch = async (api) => {
    const response = await api.get("/matches/get-random-match");
    return handleApiResponse(response);
};

export const swipeMatch = async (api, matchId, direction) => {
    const swipeValue = direction === "right" ? 1 : 2;
    const swipePayload = {
        swipe: swipeValue,
        swipeDateTime: new Date().toISOString(),
    };

    const swipeResponse = await api.put(`/matches/${matchId}`, swipePayload);

    if (swipeResponse.ok) {
        const nextMatchResponse = await api.get("/matches/get-random-match");
        return handleApiResponse(nextMatchResponse);
    }

    console.error("Error swiping match:", swipeResponse.statusText);
    return null;
}