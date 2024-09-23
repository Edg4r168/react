const ENDPOINT = "http://localhost:8080/favs";

export const deleteFavService = async ({ id, jwt }) => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ jwt })
    });

    if (!response.ok) throw new Error("Response is NOT ok");

    const res =  await response.json();
    const { favs } = res;

    return favs;
}