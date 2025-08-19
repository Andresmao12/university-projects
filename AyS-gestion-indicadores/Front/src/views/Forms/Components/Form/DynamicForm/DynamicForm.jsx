import React, { useState, useEffect } from 'react';
import './DynamicForm.css';
import { fetchRoute } from '../../../../../utils/helpers/fecthRoutes';

const DynamicForm = ({ schema, onSubmit, onCancel, initialData = {} }) => {
    const [formData, setFormData] = useState(initialData);
    const [fkOptions, setFkOptions] = useState({});

    // Cargar opciones para campos FK
    useEffect(() => {
        const loadFkOptions = async () => {
            const options = {};

            for (const field of schema.fields) {
                if (field.type === 'fk' && field.fkTable) {
                    try {
                        const token = localStorage.getItem('token')

                        const response = await fetch(`${fetchRoute}/api/proyecto/${field.fkTable}`, {
                            method: 'GET',
                            headers: {
                                "Authorization": `Bearer ${JSON.parse(token)}`,
                                "Content-Type": "application/json",
                            }
                        });
                        const data = await response.json();

                        options[field.name] = data;

                    } catch (error) {
                        console.error(`Error cargando opciones para ${field.name}:`, error);
                        options[field.name] = [];
                    }
                }
            }

            setFkOptions(options);
        };

        loadFkOptions();
    }, [schema]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token')

            const endpoint = schema.endpoints.create.replace('{nombreProyecto}', 'proyecto').replace('{nombreTabla}', schema.table);
            const response = await fetch(`${fetchRoute}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JSON.parse(token)}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.status == 201) {
                const result = await response.json();
                window.location.reload()
                setFormData({});
                onSubmit(result);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
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
                        {fkOptions[field.name]?.map((option, index) => (
                            <option key={index} value={option.id || option.nombre || option.descripcion || option.email}>
                                {option.nombre || option.descripcion || option.email}
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

    return (
        <div className="dynamic-form-container">
            <form className="dynamic-form" onSubmit={handleSubmit}>
                {schema.fields.map((field) => (
                    (field.name !== "id" || (field.name == "id" && field.isNecesary)) && (
                        <div className="form-group" key={field.name}>
                            <label>{field.name}</label>
                            {renderField(field)}
                        </div>
                    )
                ))}
                <div className="form-actions">
                    <button type="submit" className="submit-button">Guardar</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default DynamicForm;