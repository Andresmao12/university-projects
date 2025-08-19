import React, { useEffect, useState } from 'react';
import styles from './FormIndicadores.module.css';

import { fetchRoute } from '../../../../../utils/helpers/fecthRoutes.js';
import tableData from "../../../FormsTables.json";
import DataTable from '../DataTable/DataTable.jsx';

const FormIndicadores = ({ onUpdate, onClose, onSubmit, action, initialData }) => {


    // Nombres de las entidades relacionadas a la tabla de indicadores
    let tableNameEntities = ['tipoindicador', 'unidadmedicion', 'sentido', 'frecuencia', 'articulo', 'literal', 'numeral', 'paragrafo']

    // Estado en el cual almacenamos los id existentes de cada entidad relacionada
    const [fks, setFks] = useState(() =>
        tableNameEntities.reduce((acc, tableName) => {
            acc[tableName] = [];
            return acc;
        }, {})
    );

    const endpoints = tableData[0]["endpoints"] // Considerar extraer endponts en archivo aparte

    // Datos del indicador seleccionado
    const [formData, setFormData] = useState(() => ({
        "codigo": initialData?.codigo || "",
        "nombre": initialData?.nombre || "",
        "objetivo": initialData?.objetivo || "",
        "alcance": initialData?.alcance || "",
        "formula": initialData?.formula || "",
        "meta": initialData?.meta || "",
        "fkidtipoindicador": initialData?.fkidtipoindicador || "",
        "fkidunidadmedicion": initialData?.fkidunidadmedicion || "",
        "fkidsentido": initialData?.fkidsentido || "",
        "fkidfrecuencia": initialData?.fkidfrecuencia || "",
        "fkidarticulo": initialData?.fkidarticulo || "",
        "fkidliteral": initialData?.fkidliteral || "",
        "fkidnumeral": initialData?.fkidnumeral || "",
        "fkidparagrafo": initialData?.fkidparagrafo || ""
    }));
    useEffect(() => {
        console.log("FKSS:", fks)
    }, [fks])


    useEffect(() => {
        const fetchData = async (tableName) => {
            try {
                const token = localStorage.getItem('token')

                const endpoint = endpoints["getAll"]
                    .replace('{nombreProyecto}', 'proyecto')
                    .replace('{nombreTabla}', tableName);

                const res = await fetch(`${fetchRoute}${endpoint}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(token)}`,
                        "Content-Type": "application/json",
                    }
                });
                const data = await res.json();

                return { [tableName]: data }; // Retorna un objeto con la clave siendo el nombre de la tabla

            } catch (error) {
                console.error(`Error al cargar ${tableName}:`, error);
                return { [tableName]: [] }; // Si falla, devuelve un array vacío
            }
        };

        let dataEntities = {};

        // hacemos un llamado a fetchData por cada entidad relacionada
        const fetchAllDataSequentially = async () => {

            for (const table of tableNameEntities) {
                const result = await fetchData(table); // Espera cada petición antes de continuar
                Object.assign(dataEntities, result); // Agrega la data obtenida al objeto final
            }

            console.log("Datos obtenidos:", dataEntities);
            return dataEntities
        };

        const setData = async () => {

            const dataObject = await fetchAllDataSequentially();

            let auxFks = { ...fks }
            for (const [key, value] of Object.entries(dataObject)) {
                auxFks[key] = value.map(item => item["id"])
            }
            setFks(auxFks)
        }

        setData()

    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (action == "create") {
            const createIndicador = async () => {
                try {
                    const token = localStorage.getItem('token')

                    const endpoint = endpoints.create
                        .replace('{nombreProyecto}', 'proyecto')
                        .replace('{nombreTabla}', 'indicador');

                    const response = await fetch(`${fetchRoute}${endpoint}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${JSON.parse(token)}`,
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.status == 201) {

                        const result = await response.json(); // Obtenemos el registro con ID del backend
                        console.log(result)


                        const nombreDato = Object.keys(formData)[0]
                        const nombreDato2 = Object.keys(formData)[1]
                        const nuevaEntrada = {
                            [nombreDato]: formData[nombreDato],
                            [nombreDato2]: formData[nombreDato2],
                            "id": result["id"],

                        }

                        onSubmit(nuevaEntrada);
                        onClose()
                        alert(`Indicador con el id ${result["id"]} se creo exitosamente!!`)

                    }

                } catch (error) {
                    console.error('Error al enviar el formulario:', error);
                }
            }
            createIndicador()
        } else if (action == "update") {
            onUpdate(formData)
            onClose()
            console.log("Datos enviados:", formData);
        }
    };


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{action == "create" ? 'Agregar Indicador' : "Editar Indicador"}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>

                {
                    // Mapeamos los inputs de los atributos   
                    Object.entries(formData).map(([key, value]) =>

                        !(key.startsWith("fkid")) &&
                        <div className={styles.inputGroup}>
                            <label>{key}:</label>
                            <input type="text" name={key} value={value} onChange={handleChange} className={styles.input} />
                        </div>
                    )
                }

                {
                    // Mapeamos los inputs por cada una de las entidades relacionadas con sus respectivos ids
                    Object.entries(fks).map(([key, value]) => (

                        <div className={styles.inputGroup} key={key}>
                            <label>{key}:</label>
                            <select
                                name={`fkid${key}`}
                                value={formData[`fkid${key}`]}
                                onChange={handleChange}
                                className={styles.input}>

                                <option value="">Seleccione...</option>
                                {
                                    //Mapeamos los ids de la respectiva entidad
                                    value.map(item =>
                                        <option key={item} value={item}>{item}</option>
                                    )
                                }
                            </select>
                        </div>

                    ))}

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.buttonPrimary}>Guardar</button>
                    <button type="reset" className={styles.buttonSecondary} onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default FormIndicadores;