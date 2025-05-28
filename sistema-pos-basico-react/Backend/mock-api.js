// Primero importamos las herramientas que necesitamos
const express = require('express'); // Esto nos ayuda a crear el servidor
const cors = require('cors');       // Esto permite que el navegador hable con nuestro servidor sin problemas
const bodyParser = require('body-parser'); // Esto ayuda a entender los datos que nos envían en formato JSON

// Creamos el servidor con express
const app = express();
const PORT = 3001; // Puerto donde va a funcionar nuestro servidor

// Estas dos líneas ayudan al servidor a aceptar datos y peticiones de otros lugares (como nuestro React)
app.use(cors());
app.use(bodyParser.json());

// Creamos una ruta que se llama /api/pago donde nuestro frontend va a enviar la información del pago
app.post('/api/pago', (req, res) => {
  // Aquí recibimos los datos que mandó el frontend
  const { nonce, amount } = req.body;

  // Validamos que esos datos existan, si falta alguno respondemos con error
  if (!nonce || !amount) {
    return res.status(400).json({ error: 'Faltan datos: nonce o amount' });
  }

  // Simulamos que procesamos el pago (como si estuviéramos hablando con Square)
  setTimeout(() => {
    // Respondemos que el pago fue exitoso, con datos falsos para simularlo
    res.json({
      success: true,
      data: {
        paymentId: 'mock_' + Date.now(), // Creamos un id único para este pago
        amount: amount,
        currency: 'COP',
        status: 'COMPLETADO'
      }
    });
  }, 1000); // Esperamos 1 segundo para que se sienta como un proceso real
});

// Arrancamos el servidor para que escuche en el puerto 3001
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
