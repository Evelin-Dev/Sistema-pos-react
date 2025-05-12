export default function InicioSesion() {
  // 1. Estados para guardar usuario, contraseña y mensaje
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Ingresa tu usuario y contraseña');

  // 2. Función que maneja el envío del formulario
  const ingresoAlSistema = (e) => {
    e.preventDefault();               // Detiene la recarga de la página
    if (!username || !password) {
      setMessage('No puedes dejar ningún campo vacío');
      return;
    }
    setMessage('Validando ingreso...');
    setTimeout(() => {
      // Aquí redirigirías usando React Router, p.ej.:
      // const navigate = useNavigate();
      // navigate('/menu');
      alert('¡Redirigiendo a menú…!'); 
    }, 1500);
  };

  return (
    <div className="container">
      <header>
        <h1>Mantén registro y control de tus ventas, ahora!</h1>
      </header>

      <div className="content">
        <div className="login-form">
          <h2>{message}</h2>

          <form onSubmit={ingresoAlSistema}>
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Usuario"
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="1234"
              minLength={4}
            />

            <button type="submit">Ingresar</button>
          </form>
        </div>

        <div className="logo-section">
          <img
            src="./imagenes/Logo_Jitas_Software_House.png"
            alt="Logo de Jitas Software House"
          />
        </div>
      </div>

      <footer>
        <p>Elaborado por Evelin Sevilla</p>
      </footer>
    </div>
  );
}

