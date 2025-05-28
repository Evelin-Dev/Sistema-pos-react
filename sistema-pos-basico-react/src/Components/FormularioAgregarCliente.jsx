import React, { useState } from 'react';
import "./FormularioAgregarClientes.css";

function FormularioIngresoClientes({ onAgregar }) {
  const [cliente, setCliente] = useState({
    nombre: '',
    email: '',
    telefono: ""
  });

  const manejarCambio = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (onAgregar) {
      onAgregar(cliente);
      setCliente({ nombre: '', email: '', telefono: "" }); // Limpiar formulario
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario-cliente">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del cliente"
        value={cliente.nombre}
        onChange={manejarCambio}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={cliente.email}
        onChange={manejarCambio}
        required
      />
      <input
      type="number"
      name= "telefono"
      placeholder='Telefono'
      value={cliente.telefono}
      onChange={manejarCambio}
      required
      />
      <button type="submit">Agregar Cliente</button>
    </form>
  );
}

export default FormularioIngresoClientes;
