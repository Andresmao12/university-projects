import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './FormsTemplate.css'

//Componentes
import Sidebar from './Components/Sidebar/Sidebar'
import AddButton from './Components/Form/AddButton/AddButton'
import DataTable from './Components/Form/DataTable/DataTable'
import DynamicForm from './Components/Form/DynamicForm/DynamicForm'
import SearchButton from './Components/Form/SearchButton/SearchButton'
import SearchForm from './Components/Form/SearchForm/SearchForm'
import UpdateModal from './Components/Form/UpdateModal/UpdateModal'
import FormIndicadores from './Components/Form/FormIndicadores/FormIndicadores'

// Datos y variables
import { fetchRoute } from '../../utils/helpers/fecthRoutes.js'
import formData from './FormsTables.json'
import { Indicadores } from './Components/Form/Indicadores/Indicadores.jsx'

export const FormsTemplate = () => {

    const { table } = useParams()

    const [isIndicador, setIsIndicador] = useState(false) // Indica si el formulario es de indicadores

    const [showForm, setShowForm] = useState(false);
    const [showSearchInput, setshowSearchInput] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    const [selectedData, setSelectedData] = useState(null); // Datos del registro seleccionado para un update o delete ----> EN DESUSO
    const [tableData, setTableData] = useState([]); // Datos de toda la tabla

    const [actualUpdateValues, setactualUpdateValues] = useState({}) // Valores nuevos de un registro antes de enviar el update

    const [schema, setschema] = useState({}) // Estructura de la tabla (name, table, columnas)
    const [columnsSchema, setcolumnsSchema] = useState([]) // Columnas de la tabla
    const [primaryKey, setprimaryKey] = useState('') // Columna que muestra la key

    useEffect(() => {
        if (table) {
            const findTableData = formData.find(schema => schema.name == table)
            const columns = findTableData.fields.map((field) => field.name)
            const primaryKey = findTableData.fields.find(field => field.primaryKey === true).name

            setprimaryKey(primaryKey)
            setcolumnsSchema(columns)
            setschema(findTableData)
            table == "Indicador" ? setIsIndicador(true) : setIsIndicador(false)
        }
    }, [table])

    useEffect(() => {
        if (schema && schema.endpoints) {
            handleConsultar()
        }
    }, [schema])

    const handleAdd = () => {
        setSelectedData(null);
        setShowForm(!showForm);
    };

    const handleSearch = () => {
        setshowSearchInput(!showSearchInput)
    }

    const handleConsultar = async (id = null) => {
        /*
            Consulta todos los registros o el id correspondiente 
        */
        if (!schema || !schema.endpoints) {
            console.error('Schema or endpoints not defined:', schema);
            return;
        }

        try {
            let endpoint = id ? schema.endpoints.getById
                .replace('{nombreProyecto}', 'proyecto')
                .replace('{nombreTabla}', schema.table)
                .replace('{nombreClave}', 'id')
                .replace('{valor}', id)
                :
                schema.endpoints.getAll
                    .replace('{nombreProyecto}', 'proyecto')
                    .replace('{nombreTabla}', schema.table)


            const token = localStorage.getItem("token");

            const response = await fetch(`${fetchRoute}${endpoint}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            setTableData(data);

        } catch (error) {
            console.log(error)
            console.error('Error al consultar:', error);
            //if (id) handleConsultar() // ----> Validar si fue un 404?

        }
    }

    const onSubmit = async (nuevaEntrada) => {
        setTableData([...tableData, nuevaEntrada])
    }

    const handleDelete = async (row) => {
        // Obtener todos los campos que son primaryKey
        const primaryKeys = schema.fields.filter(field => field.primaryKey);

        // Determinar si es una tabla con clave compuesta
        const isCompositeKey = primaryKeys.length > 1;

        try {
            let endpoint, options;

            if (isCompositeKey) {
                // Para claves compuestas
                endpoint = schema.endpoints.delete
                    .replace('{nombreProyecto}', 'proyecto')
                    .replace('{nombreTabla}', schema.table);

                // Crear objeto con los pares clave-valor
                const deleteParams = {};
                primaryKeys.forEach(keyField => {
                    // Convertir todos los valores a string
                    deleteParams[keyField.name] = String(row[keyField.name]);
                });

                options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(deleteParams)
                };
            } else {
                // Para clave simple
                const primaryKey = primaryKeys[0].name;
                const value = row[primaryKey];

                endpoint = schema.endpoints.delete
                    .replace('{nombreProyecto}', 'proyecto')
                    .replace('{nombreTabla}', schema.table)
                    .replace('{nombreClave}', primaryKey)
                    .replace('{valorClave}', value);

                const token = localStorage.getItem('token')

                options = {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${JSON.PARSE(token)}`,
                        "Content-Type": "application/json",
                    }
                };
            }

            const response = await fetch(`${fetchRoute}${endpoint}`, options);

            if (response.ok) {
                setTableData(prevData =>
                    prevData.filter(item => {
                        const isExactMatch = primaryKeys.every(keyField =>
                            item[keyField.name] == row[keyField.name]
                        );
                        return !isExactMatch; // Mantener si NO es coincidencia exacta
                    })
                );
                alert("Eliminado con éxito");
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.title || response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            alert('Ha ocurrido un error al eliminar');
        }
    };

    const handleChangeViewUpdateModal = (row) => {
        setactualUpdateValues(row)
        setShowUpdateModal(true)
    }

    const onUpdate = async (updatedData) => {
        const changedFields = {};
        for (const key in updatedData) {
            if (updatedData[key] !== actualUpdateValues[key]) {
                changedFields[key] = updatedData[key];
            }
        }

        if (Object.keys(changedFields).length === 0) {
            console.log('No hay cambios para actualizar');
            return;
        }


        try {
            const endpoint =
                schema.endpoints.update
                    .replace('{nombreProyecto}', 'Proyecto')
                    .replace('{nombreTabla}', schema.table)
                    .replace('{nombreClave}', primaryKey)
                    .replace('{valorClave}', actualUpdateValues.id);

            const token = localStorage.getItem('token')

            const response = await fetch(`${fetchRoute}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                },
                body: JSON.stringify(changedFields),
            });

            if (response.ok) {
                setTableData((prevData) =>
                    prevData.map((row) =>
                        row.id === updatedData.id ? { ...row, ...changedFields } : row
                    )
                );
            } else {
                console.error('Error al actualizar el registro');
            }
        } catch (error) {
            console.error(error)
            alert("Ha ocurrido un problema al actualizar")
        }
    }

    const onSubmitSearchFk = async (formData) => {
        const validarVacios = (obj) => {
            return Object.values(obj).some(value =>
                value !== null &&
                value !== undefined &&
                (typeof value === 'string' ? value.trim() !== '' : true)
            );
        };

        if (Object.keys(formData).length == 0 || !validarVacios(formData)) {
            const endpoint = schema.endpoints.getAll
                .replace('{nombreProyecto}', 'proyecto')
                .replace('{nombreTabla}', schema.table)

            const token = localStorage.getItem('token')

            const response = await fetch(`${fetchRoute}${endpoint}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            setTableData(data);

        } else {
            const endpoint = `/api/{nombreProyecto}/{nombreTabla}/filtrar/compuesto`
                .replace('{nombreProyecto}', 'proyecto').replace('{nombreTabla}', schema.table);

            const token = localStorage.getItem('token')

            const response = await fetch(`${fetchRoute}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(token)}`
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            setTableData(data);
        }

    }

    return (
        <div className='app'>
            <Sidebar />

            <div className="content">
                {Object.keys(schema).length !== 0 && (
                    schema.name == "Indicador" ?
                        <Indicadores />
                        : (
                            <>
                                <div className='flex-row-end'>
                                    <SearchButton onClick={handleSearch} />
                                    <AddButton onClick={handleAdd} />
                                </div>

                                {showForm &&
                                    <DynamicForm
                                        schema={schema}
                                        onSubmit={onSubmit}
                                        onCancel={() => setShowForm(false)}
                                        initialData={selectedData || {}} // ----> SIEMPRE SE PASA {} O NULL
                                    />
                                }

                                {
                                    showSearchInput && (
                                        <SearchForm
                                            schema={schema}
                                            onCancel={() => setshowSearchInput(false)}
                                            onConsultar={handleConsultar}
                                            onConsultarFk={onSubmitSearchFk}
                                            initialData={selectedData || {}} // ----> SIEMPRE SE PASA {} O NULL

                                        />
                                    )
                                }

                                {showUpdateModal && (
                                    <UpdateModal
                                        schema={schema}
                                        onUpdate={onUpdate}
                                        onClose={() => setShowUpdateModal(false)}
                                        actualValues={actualUpdateValues}
                                    />
                                )}

                                <DataTable data={tableData} columns={columnsSchema} onDelete={handleDelete} onUpdate={handleChangeViewUpdateModal} />

                            </>
                        )

                )}
            </div>

        </div >
    )
}
