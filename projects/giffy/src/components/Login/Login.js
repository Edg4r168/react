import { useGlobalUser } from "hooks/useGlobalUser";
import { useEffect } from "react"
import { useLocation } from "wouter";

import "./Login.css"
import { useFormInput } from "./useFormInput";
import { Button } from "components/Button/styles";

export default function Login ({ closeModal }) {
    const usernameInput = useFormInput({ initialValue: "" });
    const passwordInput = useFormInput({ initialValue: "" });
    
    const [, navigete ] = useLocation();
    const { login, isLogged } = useGlobalUser();

    useEffect(() => {
        if (isLogged) {
            navigete("/");
            closeModal && closeModal();
        }
    }, [isLogged, navigete]);
    
    const handlerOnSubmit = (e) => {
        e.preventDefault();
        login({ 
            userName: usernameInput.value, 
            password: passwordInput.value
        });
    }

    return (
        <form className="form" onSubmit={handlerOnSubmit}>
            <label>
                Usuario
                <input 
                    type="text" 
                    placeholder="Usuario" 
                    {...usernameInput}
                />
            </label>
            <label>
                Contraseña
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={passwordInput.value}
                    onChange={passwordInput.onChange}
                />
            </label>
            <Button className="btn">Login</Button>
        </form>
    )
}