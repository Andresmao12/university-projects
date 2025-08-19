import Styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={Styles.container}>
            <p>&copy; 2025 Proyecto Aplicaciones y Servicios Web</p>
            <nav>
                <a href="#main">Inicio</a>
                <a href="#about">Sobre Nosotros</a>
                <a href="#contect">Contacto</a>
            </nav>
        </footer>
    )
}

export default Footer