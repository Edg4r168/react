import React, { useEffect, useState } from "react";
import { getFavsService } from "services/getFavsService";

const UserContex = React.createContext();

export const UserContexProvider = ({ children }) => {
    const [ favs, setFavs ] = useState([]);
    const [ jwt, setJWT ] = useState(() => 
        window.sessionStorage.getItem("jwt")
    );

    useEffect(() => {
        if (!jwt) return setFavs([]);
        getFavsService({ jwt })
            .then(setFavs)
            .catch(err => console.log(err));
    }, [jwt]);

    return (
        <UserContex.Provider value={{ 
            jwt, 
            favs, 
            setJWT,
            setFavs
        }}>
            {children}
        </UserContex.Provider>
    );
}

export default UserContex;