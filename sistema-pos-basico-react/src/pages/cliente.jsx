import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/clientes.css';
import FormularioIngresoClientes from '../Components/FormularioAgregarCliente';

const Clientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Gabriel Murillo', telefono: '3152961573', email: '', puntos: 1 },
    { id: 2, nombre: 'Camilo Diaz', telefono: '3201598736', email: '', puntos: 2 },
    { id: 3, nombre: 'Camilo Sanchez', telefono: '3152694536', email: '', puntos: 3 },
    { id: 4, nombre: 'Camilo Pardo', telefono: '3122159682', email: '', puntos: 4 },
    { id: 5, nombre: 'Briyith Garzon', telefono: '3212659874', email: '', puntos: 1 },
    { id: 6, nombre: 'Mariana Sandoval', telefono: '3144350912', email: '', puntos: 9 }
  ]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const handleExport = () => {
    console.log('Exportando datos de clientes...', clientes);
    alert('Datos de clientes exportados exitosamente');
  };

   const [mostrarFormulario, setMostrarFormulario] = useState(false);
   
  const handleAddCliente = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const agregarCliente = (cliente) => {
    const nuevoCliente = {
      ...cliente,
      id: clientes.length + 1,
    }
    setClientes ([ ...clientes, nuevoCliente ]);
    setMostrarFormulario (false);
  }

  const handleSelectCliente = (cliente) => {
    setSelectedCliente(cliente);
  };

  const handleEditCliente = () => {
    if (selectedCliente) {
      navigate(`/clientes/editar/${selectedCliente.id}`);
    } else {
      alert('Por favor seleccione un cliente');
    }
  };

  const handleDeleteCliente = () => {
    if (selectedCliente) {
      if (window.confirm(`¿Está seguro de eliminar a ${selectedCliente.nombre}?`)) {
        setClientes(clientes.filter(c => c.id !== selectedCliente.id));
        setSelectedCliente(null);
        alert('Cliente eliminado correctamente');
      }
    } else {
      alert('Por favor seleccione un cliente');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ⬅ Regresar
        </button>
        <h1>CLIENTES</h1>
        <div className="icon">👤</div>
      </header>

      <div className="buttons">
        <button onClick={handleExport}>EXPORTAR DATOS DE CLIENTES</button>
        <button onClick={handleAddCliente}>AGREGAR CLIENTE</button>
        {mostrarFormulario && (
          <FormularioIngresoClientes onAgregar={agregarCliente} />
        )}

        <button 
          onClick={handleEditCliente}
          disabled={!selectedCliente}
        >
          EDITAR CLIENTE
        </button>
        <button 
          onClick={handleDeleteCliente}
          disabled={!selectedCliente}
        >
          BORRAR CLIENTE
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo electrónico</th>
              <th>Puntos acumulados</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr 
                key={cliente.id}
                className={selectedCliente?.id === cliente.id ? 'selected' : ''}
                onClick={() => handleSelectCliente(cliente)}
              >
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.email || 'N/A'}</td>
                <td>{cliente.puntos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer>
        SISTEMA POS (PUNTO DE VENTA)
      </footer>
    </div>
  );
};

export default Clientes;