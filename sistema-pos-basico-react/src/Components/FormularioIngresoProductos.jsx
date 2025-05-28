import React, { useState, useEffect } from 'react';

function FormularioIngresoProductos({ onGuardar, productoInicial, modo }) {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    existencias: ''
  });

  useEffect(() => {
    if (productoInicial) {
      setProducto(productoInicial);
    }
  }, [productoInicial]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const productoFinal = {
      ...producto,
      precio: parseFloat(producto.precio),
      existencias: parseInt(producto.existencias)
    };

    // Si estamos creando, generamos un id nuevo
    if (modo === 'crear') {
      productoFinal.id = Date.now();
    }

    onGuardar(productoFinal);

    // Limpiar formulario
    setProducto({ nombre: '', descripcion: '', precio: '', existencias: '' });
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario-producto">
      <h3>{modo === 'editar' ? 'Editar Producto' : 'Nuevo Producto'}</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={producto.nombre}
        onChange={manejarCambio}
        required
      />
      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={producto.descripcion}
        onChange={manejarCambio}
        required
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={producto.precio}
        onChange={manejarCambio}
        required
      />
      <input
        type="number"
        name="existencias"
        placeholder="Existencias"
        value={producto.existencias}
        onChange={manejarCambio}
        required
      />
      <button type="submit">{modo === 'editar' ? 'Actualizar' : 'Guardar'}</button>
    </form>
  );
}

export default FormularioIngresoProductos;
