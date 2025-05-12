
export default function App() {
  return (
    <Routes>
      {/* Ruta pública de login */}
      <Route path="/" element={<InicioSesion />} />

      {/* Rutas tras login, envueltas en Layout */}
      <Route element={<Layout />}>
        <Route path="/menu"     element={<Menu />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/sistema"  element={<SistemaPOS />} />
      </Route>
    </Routes>
  );
}
