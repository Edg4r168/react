import { useGifsContext } from "hooks/useGifsContext";
import { getById } from "services/getById";
import { useEffect, useState } from "react";

export default function useSingleGif({ id }) {
    const gifsContext = useGifsContext();
    const gifFromContext = gifsContext.find(gif => gif?.id === id);

    const [ gif, setGif ] = useState(gifFromContext);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError ,setIsError ] = useState(false);
    
    useEffect(() => {
        if (!gif) {
            setIsLoading(true);

            getById(id)
                .then(gifFeched => {
                    setGif(gifFeched);
                    setIsLoading(false);
                    // setIsError(false);
                }).catch(err => {
                    setIsLoading(false);
                    setIsError(true);
                });
            }
        }, [gif, id]);
        
    return { gif, isLoading, isError };
}