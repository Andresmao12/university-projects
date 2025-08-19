import React, { useState } from 'react';
import './IndicadorModal.css'; // Archivo CSS que crearemos después

const IndicadorModal = ({ indicador, onClose }) => {
  const [activeTab, setActiveTab] = useState('general');

  const renderField = (label, value) => (
    <div className="field-container">
      <label>{label}:</label>
      <div className="field-value">{value || 'No especificado'}</div>
    </div>
  );

  const renderFKData = (label, data) => {
    if (!data) return renderField(label, 'No especificado');
    
    return (
      <div className="fk-container">
        <h4>{label}</h4>
        {data.nombre && renderField("Nombre", data.nombre)}
        {data.descripcion && renderField("Descripción", data.descripcion)}
        {data.id && !data.nombre && !data.descripcion && renderField("ID", data.id)}
      </div>
    );
  };

  const renderRelatedList = (title, items, displayField = 'nombre') => (
    <div className="related-list">
      <h4>{title}</h4>
      {items.length === 0 ? (
        <div className="no-items">No hay elementos</div>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item[displayField]} {item.fkidtipoactor && `(Tipo: ${item.fkidtipoactor})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{indicador.nombre} ({indicador.codigo})</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="tabs">
          <button 
            className={activeTab === 'general' ? 'active' : ''}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={activeTab === 'normativa' ? 'active' : ''}
            onClick={() => setActiveTab('normativa')}
          >
            Normativa
          </button>
          <button 
            className={activeTab === 'relaciones' ? 'active' : ''}
            onClick={() => setActiveTab('relaciones')}
          >
            Relaciones
          </button>
          <button 
            className={activeTab === 'resultados' ? 'active' : ''}
            onClick={() => setActiveTab('resultados')}
          >
            Resultados
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'general' && (
            <div className="tab-content">
              {renderField("Objetivo", indicador.objetivo)}
              {renderField("Alcance", indicador.alcance)}
              {renderField("Fórmula", indicador.formula)}
              {renderField("Meta", indicador.meta)}
              
              {renderFKData("Tipo de Indicador", indicador.fkdata_fkidtipoindicador)}
              {renderFKData("Unidad de Medición", indicador.fkdata_fkidunidadmedicion)}
              {renderFKData("Sentido", indicador.fkdata_fkidsentido)}
              {renderFKData("Frecuencia", indicador.fkdata_fkidfrecuencia)}
            </div>
          )}

          {activeTab === 'normativa' && (
            <div className="tab-content">
              {renderFKData("Artículo", indicador.fkdata_fkidarticulo)}
              {renderFKData("Literal", indicador.fkdata_fkidliteral)}
              {renderFKData("Numeral", indicador.fkdata_fkidnumeral)}
              {renderFKData("Párrafo", indicador.fkdata_fkidparagrafo)}
            </div>
          )}

          {activeTab === 'relaciones' && (
            <div className="tab-content">
              {renderRelatedList("Responsables", indicador.responsables)}
              {renderRelatedList("Fuentes", indicador.fuentes)}
              {renderRelatedList("Representaciones Visuales", indicador.represenvisual)}
              {renderRelatedList("Variables", indicador.variables)}
            </div>
          )}

          {activeTab === 'resultados' && (
            <div className="tab-content">
              {indicador.resultados.length === 0 ? (
                <div className="no-results">No hay resultados registrados</div>
              ) : (
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Valor</th>
                      <th>Comentarios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {indicador.resultados.map((resultado, index) => (
                      <tr key={index}>
                        <td>{resultado.fecha || 'Sin fecha'}</td>
                        <td>{resultado.valor || 'N/A'}</td>
                        <td>{resultado.comentarios || 'Sin comentarios'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const IndicadorViewer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [indicador, setIndicador] = useState(null);
  const [error, setError] = useState(null);

  const fetchIndicador = async (id) => {
    try {
      setLoading(true);
      setError(null);
      // Aquí iría tu llamada API real
      // const response = await cargarIndicadorCompleto(id);
      // setIndicador(response);
      
      // Simulación de carga
      setTimeout(() => {
        setIndicador(/* tu objeto de indicador */);
        setModalVisible(true);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError("Error al cargar el indicador");
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Ejemplo de cómo activar el modal */}
      <button 
        onClick={() => fetchIndicador(33)}
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Ver Detalles'}
      </button>
      
      {error && <div className="error-message">{error}</div>}
      
      {modalVisible && indicador && (
        <IndicadorModal 
          indicador={indicador} 
          onClose={() => setModalVisible(false)} 
        />
      )}
    </div>
  );
};

export default IndicadorModal;