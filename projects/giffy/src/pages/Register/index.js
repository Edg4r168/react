import { Register } from "components/Register/index";
import { Helmet } from "react-helmet";

export default function RegisterPage () {
   
    return <>
        <Helmet>
            <link rel='canonical' href='https://giffy.com'></link>
            <meta name='description' content="Formulario para registrar a un usuario" />
            <title>Registrarse</title>
        </Helmet>
        <h1>Register</h1>
        <Register />
    </>
}