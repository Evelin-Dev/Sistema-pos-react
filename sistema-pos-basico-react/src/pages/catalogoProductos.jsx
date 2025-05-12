import React, { useState, useRef } from 'react';
import '../CSS/CatalogoProductos.css';

export default function CatalogoProductos() {
  // Estado para almacenar productos (inicialmente vacío)
  const [productos, setProductos] = useState([]);

  // Estado para producto seleccionado
  const [selectedId, setSelectedId] = useState(null);

  // Ref para generar IDs únicos
  const nextId = useRef(1);

  // Función para exportar catálogo a CSV
  const exportarCatalogo = () => {
    if (productos.length === 0) {
      alert('No hay productos para exportar');
      return;
    }
    const headers = ['Nombre', 'Descripción', 'Precio', 'Existencias'];
    const rows = productos.map(p => [p.nombre, p.descripcion, p.precio, p.existencias]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'catalogo_productos.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Función para agregar un nuevo producto
  const agregarProducto = () => {
    const nombre = prompt('Nombre del producto:');
    if (!nombre) return;
    const descripcion = prompt('Descripción:') || '';
    const precio = parseFloat(prompt('Precio:')) || 0;
    const existencias = parseInt(prompt('Existencias:'), 10) || 0;
    const nuevo = { id: nextId.current++, nombre, descripcion, precio, existencias };
    setProductos(prev => [...prev, nuevo]);
  };

  // Función para seleccionar un producto
  const seleccionarProducto = (id) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  // Función para editar producto seleccionado
  const editarProducto = () => {
    if (selectedId == null) {
      alert('Selecciona primero un producto');
      return;
    }
    setProductos(prev => prev.map(p => {
      if (p.id !== selectedId) return p;
      const nombre = prompt('Nuevo nombre:', p.nombre) || p.nombre;
      const descripcion = prompt('Nueva descripción:', p.descripcion) || p.descripcion;
      const precio = parseFloat(prompt('Nuevo precio:', p.precio)) || p.precio;
      const existencias = parseInt(prompt('Nuevas existencias:', p.existencias), 10) || p.existencias;
      return { ...p, nombre, descripcion, precio, existencias };
    }));
  };

  // Función para borrar producto seleccionado
  const borrarProducto = () => {
    if (selectedId == null) {
      alert('Selecciona primero un producto');
      return;
    }
    if (window.confirm('¿Seguro que deseas borrar el producto seleccionado?')) {
      setProductos(prev => prev.filter(p => p.id !== selectedId));
      setSelectedId(null);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <button onClick={() => window.history.back()} className="back-button">⬅ Regresar</button>
        <h1>CATÁLOGO DE PRODUCTOS</h1>
        <div className="icon">📦</div>
      </header>

      <div className="buttons">
        <button onClick={exportarCatalogo}>EXPORTAR CATÁLOGO DE PRODUCTOS</button>
        <button onClick={agregarProducto}>AGREGAR PRODUCTO</button>
        <button onClick={() => alert('Selecciona un producto de la tabla')}>SELECCIONAR PRODUCTO</button>
        <button onClick={editarProducto}>EDITAR PRODUCTO</button>
        <button onClick={borrarProducto}>BORRAR PRODUCTO</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Existencias disponibles</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr
              key={p.id}
              className={p.id === selectedId ? 'selected' : ''}
              onClick={() => seleccionarProducto(p.id)}
            >
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{p.precio.toLocaleString()}</td>
              <td>{p.existencias}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        SISTEMA POS (PUNTO DE VENTA)
      </footer>
    </div>
  );
}
