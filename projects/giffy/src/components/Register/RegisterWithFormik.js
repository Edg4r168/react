import { Formik, Form, Field, ErrorMessage } from "formik"
import { registerService } from "services/register";

import "./Register.css"
import { useState } from "react";

const initialValue = {
    userName: "",
    password: ""
}

const validateFields = ({ userName, password}) => {
    const ERRORS = {}
    if (!userName) ERRORS.userName = "Este campo es obligatorio";

    if (!password) {
        ERRORS.password = "Este campo es obligatorio";
    } else if (password.length < 10) {
        ERRORS.password = "Debes usar 10 caracteres como minimo"
    } 

    return ERRORS;
}


export const Register = () => {
    const [ registered, setRegistered ] = useState(false);

    return <>
        {
            registered && <span className="success-message">Te has registrado correctamente</span>
        }
        <Formik
            initialValues={initialValue}
            validate={validateFields}
            onSubmit={(values, { setFieldError }) => {
                // Deveulve una promesa y estara en submit hata que se resuelve
                return registerService(values)
                    .then(() => {
                        setRegistered(true);
                    })
                    .catch(() => {
                        setFieldError("userName", "Credenciales invalidas");
                    });
            }}
        >
            {
                ({ errors, isSubmitting }) => (
                    <Form className="form">
                        <label>
                            Usuario
                            <Field className={errors.userName ? null : "error"} name="userName" type="text"/>
                            <ErrorMessage className="form-error" name="userName" component="small"/>
                        </label>
                        <label>
                            Contraseña
                            <Field name="password" type="password"/>
                            <ErrorMessage className="form-error" name="password" component="small"/>
                        </label>
                        <button className="btn" type="submit" disabled={isSubmitting}>Registrarse</button>
                    </Form>
                )    
            }
        </Formik>
    </>
        // Formik without components
    // return <>
    //     <Formik
    //         initialValues={initialValue}
    //         validate={({ userName, password}) => {
    //             const ERRORS = {}
    //             if (!userName) ERRORS.userName = "Este campo es obligatorio";

    //             if (!password) {
    //                 ERRORS.password = "Este campo es obligatorio";
    //             } else if (password.length < 10) {
    //                 ERRORS.password = "Debes usar 10 caracteres como minimo"
    //             } 

    //             return ERRORS;
    //         }}
    //         onSubmit={(values, { setFieldError }) => {
    //             // Deveulve una promesa y estara en submit hata que se resuelve
    //             return registerService(values)
    //                 .catch(() => {
    //                     setFieldError("password", "Credenciales invalidas");
    //                 });
    //         }}
    //     >
    //         {
    //             ({ errors, handleSubmit, handleChange, isSubmitting }) => (
    //                 <form className="form" onSubmit={handleSubmit}>
    //                     <label>
    //                         Usuario
    //                         <input name="userName" onChange={handleChange} type="text"/>
    //                         {
    //                             errors.userName && (
    //                                 <small className="form-error">
    //                                     {errors.userName}
    //                                 </small>
    //                             )
    //                         }
    //                     </label>
    //                     <label>
    //                         Contraseña
    //                         <input name="password" onChange={handleChange} type="password"/>
    //                         {
    //                             errors.password && (
    //                                 <small className="form-error">
    //                                     {errors.password}
    //                                 </small>
    //                             )
    //                         }
    //                     </label>
    //                     <button className="btn" type="submit" disabled={isSubmitting}>Registrarse</button>
    //                 </form>
    //             )    
    //         }
    //     </Formik>
    // </>
}
