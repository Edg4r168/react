import { Redirect } from "wouter";
import Gif from "../../components/Gif/Gif";
import Spiner from "../../components/Spiner/Spiner";
import useSingleGif from "hooks/useSingleGif";
import { Helmet } from "react-helmet";

export default function Details({ params }) {
    const { gif, isLoading, isError } = useSingleGif({ id: params.id });

    if (isError) return <Redirect to="/404" />;

    const title = gif ? gif.title : "Cargando...";

    return <>
        <Helmet>
            <title>{title} || Giffy</title>
        </Helmet>
        <h1>Detalle</h1>

        { isLoading ? <Spiner /> : <Gif {...gif} /> }
    </>
}