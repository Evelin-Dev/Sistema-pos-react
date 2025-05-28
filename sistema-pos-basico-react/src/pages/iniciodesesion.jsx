import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/iniciodesesion.css';
import { Navigate, Route } from 'react-router-dom/dist';

export default function InicioSesion({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Ingresa tu usuario y contraseña');
  const navigate = useNavigate();

  const ingresoAlSistema = (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setMessage('No puedes dejar ningún campo vacío');
      return;
    }

    setMessage('Validando credenciales...');
    
    // Simulación de autenticación
    setTimeout(() => {
        if (username === 'admin' && password === '1234') {
          navigate('/menu');
        } else {
          setMessage('Usuario o contraseña incorrectos');
        }
      }, 1500);
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Mantén registro y control de tus ventas, ¡ahora!</h1>
      </header>

      <div className="login-content">
        <div className="login-form-container">
          <h2 className="login-message">{message}</h2>

          <form onSubmit={ingresoAlSistema} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="1234"
                minLength={4}
              />
            </div>

            <button type="submit" className="login-button">
              Ingresar
            </button>
          </form>
        </div>

        <div className="login-logo">
          <img
            src="./imagenes/Logo_Jitas_Software_House.png"
            alt="Logo de Jitas Software House"
          />
        </div>
        
      </div>

      <footer className="login-footer">
        <p>Elaborado por Evelin Sevilla</p>
      </footer>
    </div>
  );
}