import { Link } from "wouter"
import styled from "@emotion/styled";

export const GifContainer = styled.div`
    position: relative;
    height: 100%;
    break-inside: avoid-column; /* Evita que un elemento se divida entre columnas */
    background-color: #f0f0f0;
    padding: 8px;
    border-radius: 8px;
`;

export const GifButtos = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
`;

export const GifLink = styled(Link)`    
    display: block;
    height: 100%;
`;

export const Title = styled.h4`
    position: absolute;
    bottom: 0;
    width: 200px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, .6);
    border-radius: 5px;
`; 

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;