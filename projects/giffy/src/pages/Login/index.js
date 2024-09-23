import Login from "components/Login/Login";
import { Helmet } from "react-helmet";

export default function LoginPage () {
    return <>
        <Helmet>
            <link rel='canonical' href='https://giffy.com'></link>
            <meta name='description' content="Formulario para iniciar sesión" />
            <title>Iniciar sesión</title>
        </Helmet>
        <h1>Login</h1>
        <Login />
    </>
}