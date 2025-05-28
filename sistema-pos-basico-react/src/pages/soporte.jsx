import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/soporte.css';

const Soporte = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const supportOptions = [
    {
      id: 1,
      icon: '📖',
      title: 'Guías',
      description: 'Accede a manuales de usuario',
      action: () => {
        setSelectedOption('guides');
        // Simular carga antes de navegar o mostrar contenido
        setTimeout(() => {
          navigate('/soporte/guias');
          setSelectedOption(null);
        }, 500);
      }
    },
    {
      id: 2,
      icon: '📞',
      title: 'Contactar',
      description: 'Comunícate con soporte técnico',
      action: () => {
        setSelectedOption('contact');
        window.open('mailto:soporte@cellphonedoctor.com?subject=Soporte%20POS');
        setSelectedOption(null);
      }
    },
    {
      id: 3,
      icon: '❓',
      title: 'FAQ',
      description: 'Respuestas a preguntas frecuentes',
      action: () => {
        setSelectedOption('faq');
        navigate('/soporte/faq');
      }
    }
  ];

  return (
    <div className="soporte-container">
      <header className="soporte-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Volver al menú"
        >
          ← Regresar
        </button>
        <h1 className="soporte-title">Soporte y Ayuda</h1>
      </header>

      <div className="support-grid">
        {supportOptions.map((option) => (
          <div
            key={option.id}
            className={`support-card ${selectedOption === option.id ? 'active' : ''}`}
            onClick={option.action}
          >
            <div className="support-icon">{option.icon}</div>
            <h2 className="support-title">{option.title}</h2>
            <p className="support-description">{option.description}</p>
            {selectedOption === option.id && (
              <div className="loading-overlay">
                <div className="spinner"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="soporte-footer">
        <p>© {new Date().getFullYear()} CellPhone Doctor POS - Versión 1.0.0</p>
      </footer>
    </div>
  );
};

export default Soporte;