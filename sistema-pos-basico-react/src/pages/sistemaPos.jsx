import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/sistemapos.css';
import FormularioIngresoCliente from '../Components/FormularioAgregarCliente';

const SistemaPOS = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([
    { id: 1, cantidad: 1, nombre: 'Producto A', descripcion: 'Descripción A', sobrantes: 5, precio: 10000 },
    { id: 2, cantidad: 2, nombre: 'Producto B', descripcion: 'Descripción B', sobrantes: 3, precio: 15000 }
  ]);
  const [turnoAbierto, setTurnoAbierto] = useState(true);

  const handleCerrarTurno = () => {
    if (window.confirm('¿Está seguro de cerrar el turno?')) {
      setTurnoAbierto(false);
      alert('Turno cerrado exitosamente');
      navigate('/menu');
    }
  };

const handleRealizarVenta = async () => {
  const total = productos.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
  const nonce = '12345'; // solo un valor cualquiera para probar

  try {
    const response = await fetch('http://localhost:3001/api/pago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nonce, amount: total * 100 }),
    });

    const text = await response.text();
    console.log('Respuesta del servidor:', text);

    const data = JSON.parse(text); // si no es JSON, va a saltar error

    if (response.ok) {
      alert(`Pago simulado exitoso por ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(total)}`);
      setProductos([]);
    } else {
      alert('Error en el pago: ' + (data.error || 'Error desconocido'));
    }
  } catch (error) {
    alert('Error al conectar con el servidor: ' + error.message);
  }
};



  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  const handleBorrarProducto = (id) => {
    setProductos(productos.filter(producto => producto.id !== id));
  };

  const handleBorrarVenta = () => {
    setProductos([]);
  };

  const [clientes, setClientes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario]=  useState(false);

  const agregarCliente = (nuevoCliente) => {
    const clienteConId = {
      ...nuevoCliente,
      id: clientes.length + 1,
    }
    setClientes ([ ...clientes, clienteConId ]);
    setCliente(clienteConId.nombre);
    setMostrarFormulario (false);

  }


  return (
    <div className="pos-container">
    

      <div className="pos-header">
        <div className="header-item">Turno N: 1</div>
        <div className="header-item">Cajera/o: Evelin</div>
        <div className="header-item">Supervisor: Nelly</div>
        <div className="header-item">Estadísticas</div>
        <button 
          className="close-btn"
          onClick={handleCerrarTurno}
          disabled={!turnoAbierto}
        >
          {turnoAbierto ? 'Cerrar Turno' : 'Turno Cerrado'}
        </button>
      </div>

      <div className="client-section">
        <input
          type="text"
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre Producto / Código"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="pos-table">
        <div className="table-header">Cant</div>
        <div className="table-header">Prod</div>
        <div className="table-header">Descripción</div>
        <div className="table-header">Sobrantes</div>
        <div className="table-header">Total</div>

        {productos.map((producto) => (
          <React.Fragment key={producto.id}>
            <div className="table-cell">{producto.cantidad}</div>
            <div className="table-cell">{producto.nombre}</div>
            <div className="table-cell">{producto.descripcion}</div>
            <div className="table-cell">{producto.sobrantes}</div>
            <div className="table-cell">{formatCurrency(producto.precio * producto.cantidad)}</div>
          </React.Fragment>
        ))}
      </div>

      <div className="action-buttons">
        <button>Consultar Precio</button>
        <button onClick={() => productos.length > 0 && handleBorrarProducto(productos[productos.length - 1].id)}>
          Borrar Producto
        </button>
        <button onClick={handleBorrarVenta}>Borrar Venta</button>
        <button>Entrada</button>
        <button>Salida</button>
      </div>

      <div className="pos-footer">
        <div className="footer-item">
          <span>Cantidad:</span>
          <span>{productos.reduce((sum, p) => sum + p.cantidad, 0)}</span>
        </div>
        <div className="footer-item">
          <span>Descuentos:</span>
          <span>$0</span>
        </div>
        <div className="footer-item">
          <span>Puntos:</span>
          <span>0</span>
        </div>
        <button
          className="client-btn"
          onClick={() => setMostrarFormulario((prev) => !prev)}
        >
          {mostrarFormulario ? 'Cancelar' : 'Agregar Cliente'}
        </button>
        {mostrarFormulario && (
        <FormularioIngresoCliente onAgregar={agregarCliente} />
        )}

        <button 
          className="sale-btn"
          onClick={handleRealizarVenta}
          disabled={productos.length === 0}
        >
          Realizar Venta
        </button>
      </div>
    </div>
  );
};

export default SistemaPOS;