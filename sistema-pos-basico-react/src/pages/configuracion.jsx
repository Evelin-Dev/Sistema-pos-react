import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/configuracion.css';

const Configuracion = () => {
  const navigate = useNavigate();

  const configItems = [
    {
      id: 1,
      icon: '👤',
      title: 'Usuarios',
      description: 'Administra los usuarios del sistema',
      onClick: () => navigate('/configuracion/usuarios')
    },
    {
      id: 2,
      icon: '⚙️',
      title: 'Parámetros',
      description: 'Configura las opciones generales',
      onClick: () => navigate('/configuracion/parametros')
    },
    {
      id: 3,
      icon: '🔒',
      title: 'Seguridad',
      description: 'Gestiona contraseñas y roles',
      onClick: () => navigate('/configuracion/seguridad')
    }
  ];

  return (
    <div className="configuracion-container">
      <header>
        <button className="back-arrow" onClick={() => navigate('/menu')}>
          ← Regresar
        </button>
        <h1>Configuración</h1>
      </header>
      
      <div className="config-grid">
        {configItems.map((item) => (
          <div 
            key={item.id} 
            className="config-item"
            onClick={item.onClick}
          >
            <h2>
              <span className="config-icon">{item.icon}</span>
              {item.title}
            </h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      
      <footer>
        <p>Sistema POS</p>
      </footer>
    </div>
  );
};

export default Configuracion;