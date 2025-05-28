import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/menu.css';




const Menu = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      icon: "/iconos/settings.png",
      title: "Configuración",
      path: "/configuracion",
      className: ""
    },
    {
      id: 2,
      icon: "/iconos/report.png",
      title: "Reportes",
      path: "/reportes",
      className: ""
    },
    {
      id: 3,
      icon: "/iconos/soporte.png",
      title: "Soporte y ayuda",
      path: "/soporte",
      className: ""
    },
    {
      id: 4,
      icon: "/iconos/catalogoProductos.png",
      title: "Catálogo de productos",
      path: "/catalogoProductos",
      className: ""
    },
    {
      id: 5,
      icon: "/iconos/iniciarTurno.png",
      title: "Iniciar turno",
      path: "/sistemaPos",
      className: "large"
    },
    {
      id: 6,
      icon: "/iconos/clientes.png",
      title: "Clientes",
      path: "/cliente",
      className: ""
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="menu-container">
      <header>
        <h1>¡BIENVENIDO! CELLPHONE DOCTOR</h1>
      </header>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className={`menu-item ${item.className}`}
            onClick={() => handleNavigation(item.path)}
          >
            <img src={item.icon} alt={item.title} />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      <footer>
        <p>SISTEMA POS (PUNTO DE VENTA)</p>
      </footer>
    </div>
  );
};

export default Menu;