import { useLocation } from "wouter";
import React from "react";
import useForm from "./useForm";

import Button from "components/Button/Button"

const RATINGS = ['g', 'pg', 'pg-13', 'r'];

function FormSearch({ initialRating = "g", initialKeyword = ""}) {
    const [ , pushLocation ] = useLocation();

    const { keyword, rating, updateKeyword, updateRating } = useForm({ initialKeyword, initialRating });

    
    const handlerChange = (e) => {
        updateKeyword(e.target.value);
    }

    const handlerSunmit = (e) => {
        e.preventDefault();
        if (!keyword) return;

        // Navegar a otra ruta
        pushLocation(`/search/${keyword}/${rating}`);
    }

    const handlerChangeRating = (e) => {
        updateRating(e.target.value);
    } 

    return (
        <form onSubmit={handlerSunmit}>
            <Button>Buscar</Button>
            <input placeholder="buscar gif..." 
                type="text" 
                value={keyword}
                onChange={handlerChange}
            ></input>

            <select onChange={handlerChangeRating} value={rating}>
                <option disabled >Ratings</option>
                {RATINGS.map(rating => <option key={rating} >{rating}</option>)}
            </select>
        </form>
    );
}

export default React.memo(FormSearch);