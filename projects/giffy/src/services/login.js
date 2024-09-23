const ENDPOINT = "http://localhost:8080/login";

export const loginService = ({ userName, password }) => {
    return fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ userName, password })

    }).then(res => {
        if (!res.ok) throw new Error("Response is NOT ok");
        return res.json();
        
    }).then(res => {
        const { jwt } = res;
        return jwt;
    });
};