import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import './Consultas.css';
import { CONSULTAS } from '../../../../../utils/helpers/constants';
import { fetchRoute } from '../../../../../utils/helpers/fecthRoutes';

export const Consultas = () => {
    const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);
    const [resultados, setResultados] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [nombreProyecto] = useState('proyecto'); // Cambia 'proyecto' por el nombre de tu proyecto real
    const [nombreTabla] = useState('indicador');

    const handleConsultaChange = (e) => {
        const idConsulta = parseInt(e.target.value);
        const consulta = CONSULTAS.find(c => c.id === idConsulta);
        setConsultaSeleccionada(consulta);
        setResultados(null);
        setError(null);

        if (idConsulta) {
            fetchResultados(idConsulta);
        }
    };

    const fetchResultados = async (idConsulta) => {
        setCargando(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No se encontró token de autenticación');
            }

            const response = await fetch(
                `${fetchRoute}/api/${nombreProyecto}/${nombreTabla}/consultas-indicadores?tipoConsulta=${idConsulta}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(token)}`
                    }
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.detalles || `Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Convertir los datos a la estructura esperada por tu tabla
            if (data.length > 0) {
                const formattedData = {
                    columns: Object.keys(data[0]),
                    data: data
                };
                setResultados(formattedData);
            } else {
                setResultados({ columns: [], data: [] });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);

            // Redirigir a login si el token es inválido o expiró
            if (error.message.includes('401') || error.message.includes('No se encontró token')) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className='app consultas-page'>
            <Sidebar />

            <div className="content">
                <div className="consultas-header">
                    <h1>Módulo de Consultas e Informes</h1>
                    <p>Seleccione una consulta para visualizar los resultados</p>
                </div>

                <div className="consultas-selector">
                    <select
                        onChange={handleConsultaChange}
                        defaultValue=""
                        disabled={cargando}
                        className="select-consulta"
                    >
                        <option value="" disabled>Seleccionar consulta</option>
                        {CONSULTAS.map(consulta => (
                            <option key={consulta.id} value={consulta.id}>
                                {consulta.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {cargando && (
                    <div className="loading-indicator">
                        <div className="spinner"></div>
                        <p>Cargando resultados...</p>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {consultaSeleccionada && !cargando && (
                    <div className="consulta-info">
                        <h2>{consultaSeleccionada.nombre}</h2>
                        <p>{consultaSeleccionada.descripcion}</p>
                    </div>
                )}

                {resultados && !cargando && (
                    <div className="resultados-container">
                        <h3>Resultados</h3>
                        {resultados.data.length > 0 ? (
                            <div className="table-responsive">
                                <table className="resultados-table">
                                    <thead>
                                        <tr>
                                            {resultados.columns.map(col => (
                                                <th key={col}>{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultados.data.map((row, index) => (
                                            <tr key={index}>
                                                {resultados.columns.map(col => (
                                                    <td key={`${index}-${col}`}>
                                                        {row[col]?.toString() || 'N/A'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="no-results">No se encontraron resultados</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};