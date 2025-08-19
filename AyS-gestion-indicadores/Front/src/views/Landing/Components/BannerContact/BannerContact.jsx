import { useState } from "react";
import styles from "./BannerContact.module.css";

const BannerContact = () => {
    const [showForm, setShowForm] = useState(false);


    const handleShowform = () => {
        setShowForm(!showForm)
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });
        }, 100);
    }

    return (
        <section className={styles.container} id="contact">
            <div className={styles.contColumns}>
                <div className={styles.column}>
                    <h3>Contáctanos</h3>
                    <p>📍 Medellín, Colombia</p>
                    <p>📞 +57 300 123 4567</p>
                    <p>✉️ contacto@ejemplo.com</p>
                </div>
                <div className={styles.column}>
                    <h3>Redes</h3>
                    <p>🌐 www.miweb.com</p>
                    <p>🔗 LinkedIn / Instagram / GitHub</p>
                </div>
                <div className={styles.column}>
                    <h3>¿Tienes dudas?</h3>
                    <button onClick={handleShowform} className={styles.btnForm}>
                        {showForm ? "Cerrar formulario" : "Escríbenos"}
                    </button>
                </div>
            </div>

            {showForm && (
                <form className={styles.contactForm} action={"https://formsubmit.co/kepoxa5186@neuraxo.com"} method="POST">
                    <h2>Un asesor se pondra en contacto contigo!</h2>
                    <div className={styles.inpCont}>
                        <input
                            id="inp-name"
                            placeholder=" "
                            required
                            name="user_name"
                        />
                        <label htmlFor="inp-name">Nombre</label>
                    </div>
                    <div className={styles.inpCont}>
                        <input
                            id="inp-email"
                            placeholder=" "
                            required
                            name="user_email"
                        />
                        <label htmlFor="inp-email">Correo</label>
                    </div>
                    <div className={styles.inpCont}>
                        <input
                            id="inp-desc"
                            placeholder=" "
                            required
                            name="descripcion"
                        />
                        <label htmlFor="inp-desc">Descripcion</label>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            )}
        </section>
    );
};

export default BannerContact;
