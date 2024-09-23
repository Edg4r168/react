import React from "react";
import { Fav } from "components/BtnFav/Fav";
import { GifContainer, GifButtos, GifLink, Title, Img } from "./styles";

function Gif({ title, id, url }) {
  return (
    <GifContainer>
      <GifButtos>
        <Fav id={id} />
      </GifButtos>
      
      <GifLink to={`/gif/${id}`}>
        <Title>{title}</Title>
        <Img src={url} alt={title}/>
      </GifLink>
    </GifContainer>
  )
}

export default React.memo(Gif, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});