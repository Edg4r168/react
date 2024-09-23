import { API_KEY, API_URL } from "./setting";

export const getById = async (gifId) => {
    const apiURL = `${API_URL}/gifs/${gifId}?api_key=${API_KEY}&rating=g`;

    const res = await fetch(apiURL);
    const { data } = await res.json();
    const { images, id, title } = data;
    const { url } = images.fixed_height_downsampled;

    return { url, id, title };
}