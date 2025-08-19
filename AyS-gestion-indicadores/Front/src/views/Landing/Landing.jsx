import styles from "./Landing.module.css"

import Nav from "./Components/Nav/Nav.jsx"
import BannerPpal from "./Components/BannerPpal/BannerPpal.jsx"
import BannerAbout from "./Components/BannerAbout/BannerAbout.jsx"
import BannerServices from "./Components/BannerServices/BannerServices.jsx"
import BannerMember from "./Components/BannerMember/BannerMember.jsx"
import BannerVideo from "./Components/BannerVideo/BannerVideo.jsx"
import BannerContact from "./Components/BannerContact/BannerContact.jsx"
import Footer from "./Components/Footer/Footer.jsx"
import AudioPlayer from "./Components/AudioPlayer/AudioPlayer.jsx"

const membersData = {
  vanessa: "Desarrolladora y diseñadora creativa. Transforma ideas en experiencias visuales limpias y funcionales. Tiene un enfoque centrado en el usuario y se obsesiona con los detalles. Le apasiona crear interfaces accesibles, intuitivas y visualmente impactantes, siempre explorando nuevas tendencias y formas de mejorar la experiencia digital.",
  andres: "Especialista en backend y bases de datos. Es el motor lógico detrás del sistema: organiza, optimiza y estructura con precisión. Tiene un don para detectar errores, mejorar el rendimiento y construir soluciones sólidas que escalan. Si algo funciona sin fallas, probablemente fue obra suya.",
  mauro: "Apasionado por la IA y el desarrollo fullstack. Conecta tecnologías frontend, backend e inteligencia artificial para construir sistemas inteligentes y eficientes. Siempre está aprendiendo algo nuevo y aplicándolo para mejorar cada línea de código. Su enfoque es práctico, curioso y siempre mirando al futuro."
}

const Landing = () => {

  return (
    <>
    <AudioPlayer></AudioPlayer>
      <Nav />
      <main className={styles.container}>
        <BannerPpal />
        <BannerAbout />
        <BannerServices />
        <h1 className={styles.membersTitle}>Integrantes</h1>
        <BannerMember name='Vanessa Espinosa' description={membersData.vanessa} />
        <BannerMember name='Andres David Orozco' description={membersData.andres} direction='right' />
        <BannerMember name='Andres Agudelo Elorza' description={membersData.mauro} />
        <BannerVideo />
        <BannerContact />
      </main>
      <Footer />
    </>
  )
}

export default Landing;


/* Mostrar una página de inicio, con encabezado, cuerpo y pie. La página de inicio debe mostrar un menú donde cada opción permita mostrar información corporativa de su empresa (una empresa de tecnología, hipotética creada por usted): quienes somos, servicios y / productos que se ofrecen, estructura organizacional, integrantes con nombre, función dentro de la empresa e email entre otros, debe mostrar logos e imágenes. Debe mostrar al menos un video elaborado por ustedes, donde se presenten todos los integrantes, se presenta la empresa y un tutorial de cómo funciona el sistema de gestión de indicadores. adicionalmente, la página de inicio debe tener una opción muy visible, para inicio de sesión con usuario y contraseña.   */ 