import { Link as LinkWouter } from "wouter";
import styled from "@emotion/styled";

export const Link = styled(LinkWouter)`
    border: 1px solid transparent;
    padding: .5rem 1rem;
    background-color: ${props => props.theme.colors.primary};
    color: ${({theme}) => theme.colors.textColor};
    cursor: pointer;
    font-size: 1rem;

    :disabled {
        opacity: .3;
        pointer-events: none;
    }
`;

export const Button = Link.withComponent("button");