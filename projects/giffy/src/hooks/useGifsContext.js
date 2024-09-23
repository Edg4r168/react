import { GifsContext } from "../context/GifsContext";
import { useContext } from "react"


export const useGifsContext = () => {
    return useContext(GifsContext).gifs;
}