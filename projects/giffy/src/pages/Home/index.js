import { useGifs } from "hooks/useGifs";
import Spiner from "components/Spiner/Spiner";
import ListOfGif from "components/ListOfGif/ListOfGif";
import { LazyTrending } from "components/TrendingSearches/index";
import FormSearch from "components/FormSearch/FormSearch";

export default function Home() {
    const { loading, gifs } = useGifs();

    return (
        <>
            <FormSearch />

            <h2>Ultima busqueda</h2>
            {
                loading
                ? <Spiner />
                : <ListOfGif gifs={gifs}/>
            }

            <LazyTrending />
        </>
    )
}