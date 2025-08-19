import styles from './Registro.module.css';
import { fetchRoute } from '../../utils/helpers/fecthRoutes.js';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdEmail, MdArrowBack } from "react-icons/md";

const Registro = () => {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Limpiar mensajes de error cuando el usuario empieza a escribir
        if (error) setError("");
    };

    const validateForm = () => {
        // Validación básica del formulario
        if (!formData.userName.trim()) {
            setError("El nombre de usuario es obligatorio");
            return false;
        }

        if (formData.userName.length < 3) {
            setError("El nombre de usuario debe tener al menos 3 caracteres");
            return false;
        }

        if (!formData.password) {
            setError("La contraseña es obligatoria");
            return false;
        }

        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return false;
        }


        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Datos a enviar (sin el campo confirmPassword)
        const dataToSend = {
            email: formData.userName,
            contrasena: formData.password
        };

        setLoading(true);
        setError("");
        try {

            const response = await fetch(`${fetchRoute}/api/proyecto/usuario`, {
                method: "POST",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const resData = await response.json();
            console.log("Respuesta del servidor al crear el usuario:", resData);

            if (!response.ok) throw new Error(resData.mensaje || `Error (${response.status}): No se pudo registrar el usuario`);

            // CREAMOS EL ROL
            const rol = { fkemail: dataToSend.email, fkidrol: 5 }

            const resRol = await fetch(`${fetchRoute}/api/proyecto/rol_usuario`, {
                method: "POST",
                body: JSON.stringify(rol),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const dataRol = await resRol.json();
            console.log("Respuesta del servidor al crear el rol:", dataRol);

            if (!response.ok) throw new Error(resData.mensaje || `Error (${response.status}): El usuario no se pudo vincular a un rol`);


            alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
            navigate("/login");
        } catch (error) {
            console.error("Error completo: ", error);
            setError("El usuario ya existe");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.login}>
            <MdArrowBack className={styles.backIcon} onClick={() => navigate("/")} />
            <form onSubmit={handleSubmit}>
                <h1>Registro de Usuario</h1>

                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

                <div className={styles.inpCont}>
                    <input
                        type="text"
                        name="userName"
                        id="inp-userName"
                        placeholder=" "
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        minLength={3}
                    />
                    <label htmlFor="inp-userName">Correo</label>
                    <MdEmail className={styles.icon} />
                </div>

                <div className={styles.inpCont}>
                    <input
                        type="password"
                        name="password"
                        id="inp-password"
                        placeholder=" "
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                    />
                    <label htmlFor="inp-password">Contraseña</label>

                    <FaLock className={styles.icon} />
                </div>

                <div className={styles.inpCont}>
                    <input
                        type="password"
                        id="inp-confirmPassword"
                        name="confirmPassword"
                        placeholder=" "
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="inp-confirmPassword">Confirmar contraseña</label>
                    <FaLock className={styles.icon} />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={loading ? styles.buttonLoading : ''}
                >
                    {loading ? "Registrando..." : "Registrar"}
                </button>

                <span className={styles.RegresarLogin} onClick={() => navigate("/login")}>
                    ¿Ya tienes una cuenta? <a>Login</a>
                </span>

            </form>
        </div>
    );
};

export default Registro;