import { useCallback, useEffect } from 'react';
import { useGifs } from '../../hooks/useGifs';
import ListOfGif from '../../components/ListOfGif/ListOfGif';
import Spiner from '../../components/Spiner/Spiner';
import { useNeerScreen } from 'hooks/useNeerScreen';
import debounce from 'just-debounce-it';
import { Helmet } from 'react-helmet';
import FormSearch from 'components/FormSearch/FormSearch';

export default function SearchResults({ params }) {
    const keyword = params?.keyword;
    const rating = params?.rating;
    
    const { loading, gifs, setPage } = useGifs({ keyword, rating });
    const { isNeerScreen, fromRef } = useNeerScreen({ distance: "110px", once: false });
    
    const title = gifs ? `${gifs.length} resultados de ${keyword}` : "";
    
    const debounceHandlerNextPage = useCallback(
        debounce(() => setPage(prevPage => prevPage + 1), 200), 
    []);

    useEffect(() => {
        if (isNeerScreen) debounceHandlerNextPage();
    }, [isNeerScreen, debounceHandlerNextPage]);

    return <>
        {
            loading 
            ? <Spiner />
            : <>
                <Helmet>
                    <link rel='canonical' href='https://giffy.com'></link>
                    <title>{title}</title>
                    <meta name='description' content={title} />
                </Helmet>
                
                <FormSearch initialRating={rating} initialKeyword={keyword} />
                
                <h3>{decodeURIComponent(keyword)}</h3>
                <ListOfGif gifs={gifs}/>
            </>   
        }
        <div id="visor" ref={fromRef}></div>
    </>
}