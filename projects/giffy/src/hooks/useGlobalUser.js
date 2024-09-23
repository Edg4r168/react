import { useCallback, useContext, useState } from "react";
import UserContex from "context/UserContext";
import { loginService } from "services/login";
import { addFavService } from "services/addFavService";
import { deleteFavService } from "services/deleteFavService";
// import { navigate } from "wouter/use-location";

export function useGlobalUser () {
    const { jwt, favs, setJWT, setFavs } = useContext(UserContex);
    const [ state, setState ] = useState({ isLoading: false, isError: false });

    // if (Boolean(jwt)) return navigate("/Login");

    const login = useCallback(({ userName, password }) => {
        setState({ isLoading: true, isError: false });

        loginService({ userName, password })
            .then(jwt => {
                setState({ isLoading: false, isError: false });
                window.sessionStorage.setItem("jwt", jwt);
                setJWT(jwt);

            }).catch(error => {
                window.sessionStorage.removeItem("jwt");
                setState({ isLoading: false, isError: true })
                console.log(error);
            });
    }, [setJWT]);

    const addFav = useCallback(({ id }) => {
        addFavService({ id, jwt })
            .then(setFavs)
            .catch(err => {
                console.log(err);
            });
    }, [jwt, setFavs])

    const deleteFav = useCallback(({ id }) => {
        deleteFavService({ id, jwt })
            .then(setFavs)
            .catch(err => {
                console.log(err);
            });;
    }, []);

    const logout = useCallback(() => {
        window.sessionStorage.removeItem("jwt", jwt);
        setJWT(null)
    }, [setJWT]);

    return {
        isLogged: Boolean(jwt),
        isLoginLoading: state.isLoading,
        hasLoginError: state.isError,
        favs,
        login,
        logout,
        addFav,
        deleteFav
    }
}