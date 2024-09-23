const ENDPOINT = "http://localhost:8080/favs";

export const getFavsService = async ({ jwt }) => {
    const response = await fetch(ENDPOINT, {
        method: "GET",
        headers: {
            "Authorization": jwt,
            "Content-type": "application/json"
        }
    });

    if (!response.ok) throw new Error("Response is NOT ok");

    const res =  await response.json();
    const { favs } = res;

    return favs;
}