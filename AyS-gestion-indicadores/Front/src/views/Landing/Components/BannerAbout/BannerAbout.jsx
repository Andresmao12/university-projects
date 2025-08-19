import React from 'react'
import styles from './BannerAbout.module.css'

const descripcion = 'Nuestro sistema es un completo de gestión de indicadores diseñado para facilitar el control, monitoreo y visualización de datos clave dentro de tu organización. Cada módulo incluye funcionalidades CRUD completas para que puedas personalizar la plataforma según tus necesidades.'

function BannerAbout() {

    return (
        <section className={styles.container} id='about'>
            <img src="https://i.imgur.com/kyKvM3n_d.webp?maxwidth=1520&fidelity=grand" alt="equipo corporativo" />
            <div className={styles.container_textCont}>
                <h1>¿Quienes somos?</h1>
                <p>{descripcion}</p>

            </div>
        </section>
    )
}

export default BannerAbout