import React, { useState } from 'react'
import { fetchRoute } from '../../../../../utils/helpers/fecthRoutes';

const SearchForm = ({ schema, onCancel, initialData = {}, onConsultar, onConsultarFk }) => {

    const [formData, setFormData] = useState(initialData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleConsultar = async () => {
        if (hasIdField) {
            if (onConsultar) {
                onConsultar(formData.id);
            }
        } else {
            if (onConsultarFk) {
                onConsultarFk(formData)
            }
        }
    };

    const hasIdField = schema.fields.some(field => field.name === "id");

    const fieldsToRender = hasIdField
        ? schema.fields.filter(field => field.name === "id")
        : schema.fields.filter(field => field.type === "fk");


    return (
        <div className="dynamic-form-container">
            <form className="dynamic-form" onSubmit={(e) => e.preventDefault()}>
                {fieldsToRender.map((field) => (
                    <div className="form-group" key={field.name}>
                        <label>{field.name}</label>
                        <input
                            type="number"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required={field.required}
                            disabled={field.disabled ?? false}
                        />
                    </div>
                ))}

                <button className='consultar-button ' type="button" onClick={handleConsultar}>Consultar</button>
            </form>
        </div>
    );
}

export default SearchForm;