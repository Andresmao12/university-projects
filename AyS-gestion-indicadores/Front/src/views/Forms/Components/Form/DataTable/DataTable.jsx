import React, { useEffect, useState } from 'react';
import './DataTable.css';
import { MdOutlineDelete } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';

const DataTable = ({ data, columns, onDelete, onUpdate }) => {
    const [rol, setRol] = useState('');

    // Recuperar el rol del usuario desde localStorage
    useEffect(() => {
        const storedRol = localStorage.getItem('rol');
        if (storedRol) {
            setRol(storedRol);
        }
    }, []);

    const deleteRow = (row) => {
        if (onDelete) {
            onDelete(row);
        }
    };

    const updateRow = (row) => {
        if (onUpdate) {
            onUpdate(row);
        }
    };

    const hasIdField = columns.some(field => field === "id");

    return (
        <table className="data-table">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                    {rol.includes('admin') && <th>Eliminar</th>}
                    {(rol.includes('admin') || rol.includes('Validador')) && hasIdField && <th>Actualizar</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
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
                        {(rol.includes('admin') || rol.includes('Validador')) && hasIdField && (
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
