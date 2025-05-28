import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/catalogoProductos.css';
import FormularioIngresoProductos from '../Components/FormularioIngresoProductos';

const CatalogoProductos = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { id: 1, nombre: 'Cámara', descripcion: 'Cámara instantánea', precio: 80000, existencias: 5 },
    { id: 2, nombre: 'Audífonos', descripcion: 'Bluetooth', precio: 54000, existencias: 15 },
    { id: 3, nombre: 'Estuches', descripcion: 'Para celular', precio: 20000, existencias: 45 },
    { id: 4, nombre: 'Cargador', descripcion: 'Tipo C, V8, Lightning', precio: 24000, existencias: 356 },
    { id: 5, nombre: 'Vidrio cerámico', descripcion: 'Todas las referencias', precio: 15000, existencias: 456 },
    { id: 6, nombre: 'Vidrio templado', descripcion: 'Todas las referencias', precio: 10000, existencias: 456 }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState(null); // 'crear' o 'editar'

  const handleExport = () => {
    // Lógica para exportar el catálogo
    console.log('Exportando catálogo...');
    alert('Catálogo exportado exitosamente');
  };

  const handleAddProduct = () => {
    setModoFormulario("crear");
    setSelectedProduct(null);
    setMostrarFormulario(true);
  };

  const handleEditProduct = () => {
    if (selectedProduct) {
      setModoFormulario("editar");
      setMostrarFormulario(true);
    } else {
      alert('Por favor seleccione un producto');
    }
  };

  const guardarProducto = (producto) => {
    if (modoFormulario === 'crear') {
      setProducts([...products, { ...producto, id: Date.now() }]);
    } else if (modoFormulario === 'editar') {
      setProducts(products.map(p => p.id === producto.id ? producto : p));
    }
    setMostrarFormulario(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      if (window.confirm(`¿Está seguro de eliminar ${selectedProduct.nombre}?`)) {
        setProducts(products.filter(p => p.id !== selectedProduct.id));
        setSelectedProduct(null);
      }
    } else {
      alert('Por favor seleccione un producto');
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  return (
    <div className="catalogo-container">
      <header className="catalogo-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ⬅ Regresar
        </button>
        <h1>CATÁLOGO DE PRODUCTOS</h1>
        <div className="icon">📦</div>
      </header>

      <div className="action-buttons">
        <button onClick={handleExport}>EXPORTAR CATÁLOGO</button>
        <button onClick={handleAddProduct}>AGREGAR PRODUCTO</button>
        <button 
          onClick={handleEditProduct}
          disabled={!selectedProduct}
        >
          EDITAR PRODUCTO
        </button>
        <button 
          onClick={handleDeleteProduct}
          disabled={!selectedProduct}
        >
          BORRAR PRODUCTO
        </button>
      </div>

      {mostrarFormulario && (
        <FormularioIngresoProductos 
          onGuardar={guardarProducto}
          productoInicial={modoFormulario === 'editar' ? selectedProduct : null}
          modo={modoFormulario}
        />
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Existencias</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr 
                key={product.id}
                className={selectedProduct?.id === product.id ? 'selected' : ''}
                onClick={() => handleSelectProduct(product)}
              >
                <td>{product.nombre}</td>
                <td>{product.descripcion}</td>
                <td>{formatPrice(product.precio)}</td>
                <td>{product.existencias}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="catalogo-footer">
        SISTEMA POS (PUNTO DE VENTA)
      </footer>
    </div>
  );
};

export default CatalogoProductos;
