export const handleApiResponse = (response) => {
    if (response.ok) {
        return response.body;
    } else {
        console.error("API Error:", response.statusText || "Unknown error");
        return null;
    }
};