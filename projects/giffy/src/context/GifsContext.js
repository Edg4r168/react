import React, { useState } from "react";

export const GifsContext = React.createContext({});


export const GifsContextProvider = ({ children }) => {
    const [ gifs, setGif ] = useState([]);

    return (
        <GifsContext.Provider value={{ gifs, setGif }}>
            {children}
        </GifsContext.Provider>
    );
}

