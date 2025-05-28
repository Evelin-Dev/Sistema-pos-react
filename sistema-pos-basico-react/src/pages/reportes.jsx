import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/reportes.css';

const Reportes = () => {
  const navigate = useNavigate();
  const [activeReport, setActiveReport] = useState(null);

  const reportItems = [
    {
      id: 1,
      icon: '📊',
      title: 'Ventas',
      description: 'Consulta reportes de ventas diarias',
      path: '/reportes/ventas'
    },
    {
      id: 2,
      icon: '📦',
      title: 'Inventario',
      description: 'Revisa el estado del inventario',
      path: '/reportes/inventario'
    },
    {
      id: 3,
      icon: '👥',
      title: 'Clientes',
      description: 'Visualiza el historial de clientes',
      path: '/reportes/clientes'
    }
  ];

  const handleReportClick = (path) => {
    // Simulación de carga antes de navegar
    setActiveReport(path);
    setTimeout(() => {
      navigate(path);
      setActiveReport(null);
    }, 500);
  };

  return (
    <div className="reportes-container">
      <header>
        <button 
          className="back-arrow"
          onClick={() => navigate(-1)}
          aria-label="Regresar"
        >
          ← Regresar
        </button>
        <h1>Reportes</h1>
      </header>

      <div className="reportes-grid">
        {reportItems.map((item) => (
          <div
            key={item.id}
            className={`reporte-item ${activeReport === item.path ? 'loading' : ''}`}
            onClick={() => handleReportClick(item.path)}
          >
            <h2>
              <span className="reporte-icon">{item.icon}</span>
              {item.title}
            </h2>
            <p>{item.description}</p>
            {activeReport === item.path && (
              <div className="loading-indicator">Cargando...</div>
            )}
          </div>
        ))}
      </div>

      <footer>
        <p>Sistema POS - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Reportes;