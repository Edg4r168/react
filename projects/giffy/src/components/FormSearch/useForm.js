import { useReducer } from "react";

const ACTIONS = {
    UPDATE_KEYWORD: "keyword",
    UPDATE_RATING: "rating"
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_KEYWORD:
            return {
                ...state,
                keyword: action.payload,
            }

        case ACTIONS.UPDATE_RATING:
            return {
                ...state,
                rating: action.payload
            }
    
        default:
            return state;
    }
};


export default function useForm ({ initialKeyword, initialRating }) {
    const [ state, dispach ] = useReducer(reducer, {
        keyword: decodeURIComponent(initialKeyword),
        rating: initialRating
    });
    
    const { keyword, rating } = state;
    
    return {
        keyword,
        rating,
        updateKeyword: keyword =>
            dispach({ type: ACTIONS.UPDATE_KEYWORD, payload: keyword }),
        updateRating: rating =>
            dispach({ type: ACTIONS.UPDATE_RATING, payload: rating })
    }
}