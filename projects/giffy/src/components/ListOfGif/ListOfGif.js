import Gif from "../Gif/Gif"
import React from "react"
import "./styles.css"

function ListOfGif({ gifs }) {
    
    return <div className="ListOfGifs">
        {
            gifs.map(({ title, id, url, ...rest }) => (
                <Gif key={id} 
                    id={id} 
                    title={title} 
                    url={url}
                    restInfo={rest}
                /> 
            ))
        }
    </div>
}

export default React.memo(ListOfGif);