import { API_KEY, API_URL } from "./setting";


export default async function getGifs({ keyword = "panda", rating = "g", limit = 15, page = 0} = {}) {
    const apiURL = `${API_URL}/gifs/search?api_key=${API_KEY}q=${keyword}&limit=${limit}&offset=${page * limit}&rating=${rating}&lang=en&bundle=messaging_non_clips`;
    const res = await fetch(apiURL);
    const response = await res.json();
    const { data } = response;

    return data.map(image => { 
        const { images, id, title } = image;
        const { url } = images.fixed_height_downsampled;

        return { url, id, title };
    });

    // return fetch(apiURL)
    // .then(res => res.json())
    // .then(response => {
    //   const { data } = response;

    //   return data.map(image => image.images.fixed_height_downsampled.url);
    // })
}