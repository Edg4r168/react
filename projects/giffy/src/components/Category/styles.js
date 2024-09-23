import styled from "@emotion/styled";
import { Link } from "wouter";

const NEED_WHITE_COLOR = [3, 4];

export const CategoryTitle = styled.h2`
    color: #f3f3f3;
    font-weight: bold;
    margin-bottom: 0.7rem;
    margin-top: 0.6rem;
`;

export const CategoryList = styled.ul`
    list-style-position: inside;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
`;

export const CategoryListItem = styled.li`
    list-style: none;
    padding: 0.3rem;
    margin: 0.2rem;
    font-size: 1.2rem;

    ${
        props => {
            const colorIndex = props.index % 5 + 1;
            const needWhite = NEED_WHITE_COLOR.includes(colorIndex);
            const color = needWhite ? "white" : "var(--theme-body-bg)";

            return `
                background-color: var(--brand-color_${colorIndex});
                color: ${color};
            `
        }
    }
`;

export const CategoryLink = styled(Link)`
    color: inherit;
    font-size: 1em;
    transition: color ease-in 0.1s;
    text-decoration: none;
`;