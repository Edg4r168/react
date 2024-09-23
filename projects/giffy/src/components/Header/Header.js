import { Link, useRoute } from "wouter";

import "./Header.css";
import { useGlobalUser } from "hooks/useGlobalUser";


export default function Header () {
    const { isLogged, logout } = useGlobalUser();
    const [ match ] = useRoute("/login");

    const rederLoginButtons = () => {
        return isLogged 
            ? <Link to="/login" onClick={logout}>Logout</Link>
            : <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </> 
    };

    return (
        <header className="gf-header">
            {
                match 
                ? null
                : rederLoginButtons()
            }
        </header>
    )
}