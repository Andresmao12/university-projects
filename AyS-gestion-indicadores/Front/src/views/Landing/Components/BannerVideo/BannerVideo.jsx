import React from 'react'
import ReactPlayer from "react-player";
import styles from './BannerVideo.module.css'

const content = "Usar nuestra plataforma es más fácil de lo que imaginas. En este breve video te mostramos paso a paso cómo navegar por el sistema, gestionar los indicadores, crear nuevos registros y sacarle el máximo provecho a todas las funciones disponibles."

function BannerVideo() {

    return (
        <section className={styles.container}>
            <div className={styles.textCont}>
                <h1>¿Como iniciar?</h1>
                <p>{content}</p>
            </div>
            <div className={styles.videoCont}>
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    controls
                    width="100%"
                    height="100%"
                    className={styles.video}
                />
                <img src="https://i.imgur.com/h7Z78Bq.png" alt="" />
            </div>

        </section>
    )
}

export default BannerVideo
