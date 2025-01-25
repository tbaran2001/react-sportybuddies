import {handleApiResponse} from "./apiUtils";

export const getBuddies = async (api) => {
    const response = await api.get("/buddies");
    return handleApiResponse(response)?.buddies;
};