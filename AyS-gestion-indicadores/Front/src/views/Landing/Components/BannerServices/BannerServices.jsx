import React, { useState } from 'react';
import styles from './BannerServices.module.css';

import Target from './components/Target/Target';

import { FaPhp, FaReact, FaNode, FaDatabase, FaStreetView } from "react-icons/fa";
import { SiGooglebigquery } from "react-icons/si";
import { HiViewfinderCircle } from "react-icons/hi2";
import { BsInfoLg, BsGraphUp } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";
import { HiOutlineVariable } from "react-icons/hi";


const services = [
    { Icon: SiGooglebigquery, title: "Consultas", desc: "Explora y filtra la información que necesitas con rapidez." },
    { Icon: FaDatabase, title: "Indicadores y tipos", desc: "Crea y administra indicadores clave según categorías personalizadas" },
    { Icon: HiViewfinderCircle, title: "Representación visual", desc: "Define cómo se mostrarán los datos: gráficas, tablas, o formatos personalizados." },
    { Icon: FaStreetView, title: "Actores y tipos", desc: "Gestiona las personas o entidades que interactúan con los datos." },
    { Icon: BsInfoLg, title: "Fuentes de información", desc: "Registra y enlaza fuentes confiables para cada indicador." },
    { Icon: BsGraphUp, title: "Unidades de medición y sentido", desc: "Estandariza cómo se interpretan los datos (%, cantidad, crecimiento, etc.)." },
    { Icon: CiTimer, title: "Frecuencia y temporalidad", desc: "Define la periodicidad de cada indicador (mensual, anual, etc.)." },
    { Icon: HiOutlineVariable, title: "Variables y relaciones cruzadas", desc: "Asocia variables, responsables y representaciones visuales a cada indicador." }
];

function BannerServices() {

    return (
        <section className={styles.container}>
            <h2>Servicios</h2>
            <div className={styles.gridCont}>
                {services.map((service, index) => (
                    <Target
                        key={index}
                        Icon={service.Icon}
                        title={service.title}
                        desc={service.desc}
                    />
                ))}
            </div>
        </section>
    );
}

export default BannerServices;