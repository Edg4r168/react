import React, { useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useLocation } from 'wouter';

import { registerService } from "services/register";
import { Notification } from 'components/Notification/Notification';
import "./Register.css";

export const Register = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [, navigate ] = useLocation();

    const [ registered, setRegistered ] = useState(false);
    // const [ isSubmitting, setIsSubmitting ] = useState(false);

    const onSubmit = values => {
        registerService(values)
            .then(() => {
                setRegistered(true);
            })
            .catch(() => {
                alert("Ha ocurrido un errro inesperado");
            });
    }

    const handlerTimeout = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    return <>
        {
            registered && <Notification duration={1000} onTimeout={handlerTimeout}>Te has registrado correctamente</Notification>
        }
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label>
                Usuario
                <input {...register("userName", { required: "Este campo es obligatorio" })} type="text"/>
                {
                    errors.userName?.message && (
                        <small className="form-error">
                            {errors.userName.message}
                        </small>
                    )
                }
            </label>
            <label>
                Contraseña
                <input {...register("password", { 
                        required: "Este campo es obligatorio",
                        minLength: { value: 10, message: "Utiliza un minimo de 10 caracteres "}
                    })} 
                    type="password"
                />
                <ErrorMessage errors={errors} 
                    name='password' 
                    render={({ message })=> <small className="form-error">{message}</small>}
                />
            </label>
            <button className="btn" type="submit" >Registrarse</button>
        </form>
    </>
}