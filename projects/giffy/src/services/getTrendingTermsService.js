import { API_KEY, API_URL } from "./setting";

export const getTrendingTerms = async () => {
    const apiURL = `${API_URL}/trending/searches?api_key=${API_KEY}`;
    const res = await fetch(apiURL);
    const response = await res.json();
    const { data = [] } = response;

    return data;
}