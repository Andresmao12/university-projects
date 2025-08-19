import { useState } from "react";
import { fetchRoute } from '../../utils/helpers/fecthRoutes.js';
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();

        const dataToSend = {
            campoUsuario: "email",
            campoContrasena: "contrasena",
            valorUsuario: email,
            valorContrasena: contrasena,
        }

        const response = await fetch(`${fetchRoute}/api/proyecto/usuario/verificar-contrasena`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            const data = await response.json();

            console.log('DATALOGINTK', data)

            const toLlocalStorage = { email: data.email, rol: data.rol }

            console.log("DATA: ", data)
            // Guarda los datos del usuario y los roles en localStorage
            localStorage.setItem("usuario", JSON.stringify(toLlocalStorage));
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("token", JSON.stringify(data.token))
            navigate("/formularios");
        } else {
            alert("Usuario o contraseña incorrecta");
        }
    };


    return (
        <div className={styles.login}>
            <MdArrowBack className={styles.backIcon} onClick={() => navigate("/")} />
            <form onSubmit={handleLogin}>
                <h1>Bienvenido</h1>
                <div className={styles.inpCont}>
                    <input
                        id="inp-email"
                        placeholder=" "
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="inp-email">Correo</label>
                    <FaUser className={styles.icon} />
                </div>

                <div className={styles.inpCont}>
                    <input
                        id="inp-password"
                        type="password"
                        placeholder=" "
                        required
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                    <label htmlFor="inp-password">Contraseña</label>
                    <FaLock className={styles.icon} />
                </div>
                <button type="submit">Ingresar</button>

                <span className={styles.RegresarLogin} onClick={() => navigate("/registro")}>
                    ¿No tienes una cuenta? <a>Registrarse</a>
                </span>
            </form>
        </div>
    );
};

export default Login;
