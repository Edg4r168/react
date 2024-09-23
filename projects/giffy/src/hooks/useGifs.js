import { useEffect, useState, useContext } from 'react';
import getGifs from '../services/getGifs';
import { GifsContext } from "../context/GifsContext";

export function useGifs({ keyword, rating } = { keyword: null }) {
    const { gifs, setGif } = useContext(GifsContext);
    const [ loading, setLoading ] = useState(false);
    const [ loadingNextPage, setLoadingNextPage ] = useState(false);
    const [ page, setPage ] = useState(0);

    const keywordToUse = keyword ?? localStorage.getItem("lastKeyword") ?? "random";

    useEffect(() => {
        setLoading(true);

        getGifs({ keyword: keywordToUse, rating })
            .then(gifsArray => {
                setGif(gifsArray);
                setLoading(false);

                if(keyword) localStorage.setItem("lastKeyword", keyword);
            });
        
    }, [keyword, setGif, keywordToUse, rating])
    
    useEffect(() => {

        if (page === 0) return;

        setLoadingNextPage(true);
        getGifs({ keyword: keywordToUse, page, rating })
            .then(nextGifs => {
                setGif(prevGifs => prevGifs.concat(nextGifs));
                setLoadingNextPage(false);
            });
    }, [page, keywordToUse, rating, setGif]);

    return { loading, loadingNextPage, gifs, setPage };
}