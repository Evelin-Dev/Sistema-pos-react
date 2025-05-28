import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import InicioSesion from './pages/iniciodesesion';
import Menu from './pages/menu';
import SistemaPos from './pages/sistemaPos';
import Configuracion from './pages/configuracion';
import CatalogoProductos from './pages/catalogoProductos';
import Cliente from './pages/cliente';
import Reportes from './pages/reportes';
import Soporte from './pages/soporte';

function App() {
  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InicioSesion />} />
          <Route path="/menu" element={<Menu />} />
            <Route path="/sistemaPos" element={<SistemaPos />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/catalogoProductos" element={<CatalogoProductos />} />
            <Route path="/cliente" element={<Cliente />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/soporte" element={<Soporte />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




