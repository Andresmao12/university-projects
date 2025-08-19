import React, { useEffect, useState } from 'react'
import './Indicadores.css'
import Schemas from '../../../FormsTables.json'
import { fetchRoute } from '../../../../../utils/helpers/fecthRoutes';
import { MdOutlineDelete } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import IndicadorModal from './IndicadorModal';

const tipos = {
    Responsables: [
        { name: "fkidresponsable", type: "select" }
    ],
    Fuentes: [
        { name: "fkidfuente", type: "select" }
    ],
    RepresentacionVisual: [
        { name: "fkidrepresenvisual", type: "select" }
    ],
    Variables: [
        { name: "fkidvariable", type: "select" },
        { name: "dato", type: "text" }
    ],
    Resultado: [
        { name: "resultado", type: "number" }
    ]
};


export const Indicadores = () => {

    const [showModalCreate, setshowModalCreate] = useState(false)
    const [formData, setFormData] = useState({})
    const [fkOptions, setFkOptions] = useState([])
    const [rol, setRol] = useState('');

    const [columns, setcolumns] = useState(Schemas[0].fields.map((field) => field.name))
    const [tableData, setTableData] = useState([]); // Datos de toda la tabla

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [indicador, setIndicador] = useState(null);

    const url = useLocation()


    useEffect(() => {
        const storedRol = localStorage.getItem('rol');
        if (storedRol) {
            setRol(storedRol);
        }
    }, []);

    useEffect(() => {
        if (Schemas) {
            loadFkOptions()
        }
    }, [Schemas, url])


    const handleChangeShowFormCreate = () => {
        setshowModalCreate(!showModalCreate)
    }

    const handleCrearIndicador = async () => {
        try {
            const token = localStorage.getItem('token')
            console.log("SE APRETO CREAR IND")

            // Creamos el indicador
            const resp = await fetch(`${fetchRoute}/api/proyecto/indicador`, {
                method: "POST",
                body: JSON.stringify({ ...formData }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                }
            });

            // Tomamos el id de indicador
            const idIndicador = await resp.json();

            // Tomamos los obj con los demas id
            const datosAgregadosFilt = Object.fromEntries(
                Object.entries(datosAgregados).filter(
                    ([_, value]) => Array.isArray(value) && value.length > 0
                )
            );

            console.log('DATOS AGREGADOS: ', datosAgregadosFilt)

            // Iteramos los obj q contienen los id de los datos agregados nombretabla : { nombrecolumna : id }
            for (const [entidad, idObj] of Object.entries(datosAgregadosFilt)) {

                // Definimos los nombres de tabla y columna
                const nombreTablaRelacion = `${entidad.toLowerCase()}porindicador`
                const nombreColumna = tipos[entidad][0]['name']

                console.log('IDOBJ: ', idObj)

                for (const [_, id] of Object.entries(idObj)) {

                    console.log("ENTIDAD:", entidad, "ID", id)
                    console.log("NOMBRE COLUMNA:", idIndicador, "NOMBRE TABLA", JSON.stringify(id))

                    const relacion = {
                        'fkidindicador': Object.values(idIndicador)[0],
                        [nombreColumna]: Object.values(id)[0]
                    };

                    const token = localStorage.getItem('token')

                    const resp = await fetch(`${fetchRoute}/api/proyecto/${nombreTablaRelacion}`, {
                        method: "POST",
                        body: JSON.stringify(relacion),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${JSON.parse(token)}`,
                        }
                    });

                }


            }

            // console.log('Datos completos indicador: ', indicadorCompleto);

            // Limpiar formularios
            setFormData({});
            setDatosAgregados({
                Responsables: [],
                Fuentes: [],
                RepresentacionVisual: [],
                Variables: [],
                Resultado: []
            });
            setshowModalCreate(false); // cerrar modal

        } catch (error) {
            console.error("Error al crear indicador:", error);
            alert("Ocurrió un error al crear el indicador");
        }
    };


    const loadFkOptions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${fetchRoute}/api/proyecto/indicadores/ListarIndicadores`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "application/json",
                }
            });


            if (response.status == 200) {
                const data = await response.json();
                console.log(data)
                setFkOptions(data.opciones);
                setTableData(data.indicadores);
            } else {
                setTimeout(() => {
                    loadFkOptions()
                }, 300);
            }


        } catch (error) {
            console.error("Error cargando datos de indicadores:", error);
            setFkOptions({});
        }
    };

    /* MODAL */

    const fieldsSchema = Schemas[0].fields

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const [modoActual, setModoActual] = useState(null);
    const [inputExtra, setInputExtra] = useState({});
    const [datosAgregados, setDatosAgregados] = useState({
        Responsables: [],
        Fuentes: [],
        RepresentacionVisual: [],
        Variables: [],
        Resultado: []
    });

    const handleInputExtraChange = (e) => {
        const { name, value } = e.target;
        setInputExtra((prev) => ({ ...prev, [name]: value }));
    };

    const handleAgregarDato = () => {
        if (!modoActual) return;

        setDatosAgregados((prev) => ({
            ...prev,
            [modoActual]: [...prev[modoActual], inputExtra]
        }));

        setInputExtra({});
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'string':
                return (
                    <input
                        type="text"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        disabled={field.disabled || false}
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        disabled={field.disabled || false}
                    />
                );
            case 'datetime':
                return (
                    <input
                        type='date'
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                    >

                    </input>

                );
            case 'fk':
                return (
                    <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                    >
                        <option value="">Seleccione una opción</option>
                        {fkOptions[field.name]?.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.nombre || option.descripcion}
                            </option>
                        ))}
                    </select>
                );

            case 'datetime':
                return (
                    <input
                        type="datetime-local"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        disabled={field.disabled || false}
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        disabled={field.disabled || false}
                    />
                );
        }
    };


    const cargarIndicadorCompleto = async (id) => {

        console.log(id)
        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            const response = await fetch(`${fetchRoute}/api/proyecto/indicadores/ObtenerIndicadorCompleto/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "application/json",
                }
            });

            console.log(response)

            if (!response.ok) throw new Error("Error al cargar indicador");

            const data = await response.json();

            console.log(data)

            setTimeout(() => {
                setIndicador(data);
                setModalVisible(true);
                setLoading(false);
            }, 800);

            return data;

        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };


    return (
        <div>
            {/* HEADER */}
            <header>
                {rol === 'admin' && (
                    <button onClick={handleChangeShowFormCreate}>Crear Indicador</button>
                )}
                <button>Buscar</button>
            </header>


            {rol === 'admin' && (
                showModalCreate && (
                    <div className='container-modal'>
                        <div className='close-modal' onClick={handleChangeShowFormCreate}></div>
                        <div className='modal-create'>

                            <h3>INDICADORES</h3>
                            <form className='modal-create-form'>
                                {fieldsSchema.map((field) => (
                                    field.name !== "id" && (
                                        <div className="form-group" key={field.name}>
                                            <label>{field.name}</label>
                                            {renderField(field)}
                                        </div>
                                    )

                                ))}
                            </form>

                            <section>
                                <h4>AGREGAR</h4>
                                <div className="btns-acciones-form">
                                    {Object.keys(tipos).map((tipo) => (
                                        <button type="button" key={tipo} onClick={() => setModoActual(tipo)}>
                                            {tipo}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* 🧩 Formulario condicional para agregar datos extras */}
                            {modoActual && (
                                <div style={{ marginTop: "2rem" }}>
                                    <h4>Agregar a {modoActual}</h4>
                                    {tipos[modoActual].map((campo, index) => (
                                        <div key={index} className='form-group'>
                                            <label>{campo.name}</label>
                                            {
                                                campo.type == "select" ? (
                                                    <select
                                                        name={campo.name}
                                                        value={inputExtra[campo.name] || ''}
                                                        onChange={handleInputExtraChange}
                                                    >
                                                        <option value="">Seleccione una opción</option>
                                                        {fkOptions[campo.name]?.map((option) => (
                                                            <option key={option.id} value={option.id}>
                                                                {option.nombre || option.descripcion}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        name={campo.name}
                                                        value={inputExtra[campo.name] || ""}
                                                        onChange={handleInputExtraChange}
                                                    />
                                                )
                                            }


                                        </div>
                                    ))}

                                    <button type="button" onClick={handleAgregarDato}>
                                        Agregar
                                    </button>


                                </div>

                            )}

                            {/* 🗃 Mostrar tablas de datos agregados */}
                            <div className='tabla-agregados-container'>
                                {Object.entries(datosAgregados).map(([tipo, datos]) =>
                                    datos.length > 0 ? (
                                        <div key={tipo} className='mostrarDatosAgregados'>
                                            <h5 className=''>{tipo} agregados:</h5>
                                            <table border="1" style={{ marginBottom: "1rem" }}>
                                                <thead>
                                                    <tr>
                                                        {Object.keys(datos[0]).map((col) => (
                                                            <th key={col}>{col}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {datos.map((fila, idx) => (
                                                        <tr key={idx}>
                                                            {Object.values(fila).map((val, i) => (
                                                                <td key={i}>{val}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : null
                                )}

                            </div>

                            <button type="button" onClick={handleCrearIndicador}>
                                Crear Indicador
                            </button>
                        </div>

                    </div>
                )
            )}

            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                        {rol.includes('admin') && <th>Eliminar</th>}
                        {(rol.includes('admin') || rol.includes('Validador')) && <th>Actualizar</th>}
                        {(rol.includes('admin') || rol.includes('Validador') || rol.includes('Verificador')) && <th>Ver info.</th>}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column, index2) => (
                                <td key={index2}>{row[column]}</td>
                            ))}
                            {rol === 'admin' && (
                                <td>
                                    <span>
                                        <MdOutlineDelete
                                            size={27}
                                            color='red'
                                            cursor={'pointer'}
                                            onClick={() => { deleteRow(row) }}
                                        />
                                    </span>
                                </td>
                            )}
                            {(rol.includes('admin') || rol.includes('Validador')) && (
                                <td>
                                    <span>
                                        <RxUpdate
                                            size={27}
                                            color='blue'
                                            cursor={'pointer'}
                                            onClick={() => { updateRow(row) }}
                                        />
                                    </span>
                                </td>
                            )}

                            {(rol.includes('admin') || rol.includes('Validador') || rol.includes('Verificador')) && <td><FaEye cursor={'pointer'} onClick={() => { cargarIndicadorCompleto(row.id) }} /></td>}

                        </tr>
                    ))}
                </tbody>
            </table>



            {modalVisible && indicador && (
                <IndicadorModal
                    indicador={indicador}
                    onClose={() => setModalVisible(false)}
                />
            )}

        </div>
    )
}
