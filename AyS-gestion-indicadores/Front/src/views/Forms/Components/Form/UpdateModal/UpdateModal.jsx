import React, { useState, useEffect } from 'react';
import './UpdateModal.css';
import { fetchRoute } from '../../../../../utils/helpers/fecthRoutes';

const UpdateModal = ({ schema, onUpdate, onClose, actualValues }) => {
    const [formData, setFormData] = useState(actualValues);
    const [fkOptions, setFkOptions] = useState({});
    const [loading, setLoading] = useState(true);


    // Cargar opciones para campos FK
    useEffect(() => {
        const loadFkOptions = async () => {
            const options = {};

            for (const field of schema.fields) {
                if (field.type === 'fk' && field.fkTable) {
                    try {
                        const token = localStorage.getItem('token')

                        const response = await fetch(`${fetchRoute}/api/proyecto/${field.fkTable}`, {
                            method: "GET",
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
            setLoading(false);
        };

        loadFkOptions();
    }, [schema]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onUpdate(formData);
        onClose();
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
            case 'fk':
                return (
                    <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        disabled={field.disabled || false}
                    >
                        <option value="">Seleccione una opción</option>
                        {fkOptions[field.name]?.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.nombre || option.descripcion || option.id}
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

    if (loading) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <p>Cargando opciones...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="dynamic-form-container">
                    <form className="dynamic-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        {schema.fields.map((field) => (
                            field.name !== "id" && (
                                <div className="form-group" key={field.name}>
                                    <label>{field.name}</label>
                                    {renderField(field)}
                                </div>
                            )
                        ))}

                        <div className="form-actions">
                            <button type="submit" className="submit-button">Guardar</button>
                            <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;