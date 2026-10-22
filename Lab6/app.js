const express = require('express');
const cursosRoutes = require('./routes/cursos.routes'); //Aquí conectamos las rutas
const app = express();
app.use(express.json());
app.use('/api/cursos', cursosRoutes);
// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
module.exports = app;