import Login from "components/Login/Login";
import { ModalPortal } from "components/Modal/Modal";
import { useGlobalUser } from "hooks/useGlobalUser";
import { useCallback, useState } from "react";

export const Fav = ({ id }) => {
    const { isLogged, favs, addFav, deleteFav } = useGlobalUser();
    const [ showModal, setShowModal ] = useState(false);

    const isFav = favs.some(favId => favId === id);

    const handlerClick = () => {
        if (!isLogged) return setShowModal(true);
            
        isFav ? deleteFav({ id }) : addFav({ id });
    }

    const handlerCloseModal = useCallback(() => {
        setShowModal(false);
    }, [setShowModal])


    const [ label, emoji ] = isFav
    ? ["Remove Gif from favorites", "❌"]
    : ["Add Gif to favorites", "❤️"];

    return <>
        <button onClick={handlerClick}>
            <span aria-label={label} role="img" >{emoji}</span>
        </button>

        {showModal && (
            <ModalPortal onClose={handlerCloseModal}> 
                <Login closeModal={handlerCloseModal}/> 
            </ModalPortal>
        )}
    </> 
}