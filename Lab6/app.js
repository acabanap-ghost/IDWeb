const express = require('express');
const cursosRoutes = require('./routes/cursos.routes');
//Importamos los middlewares
const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');
const app = express();
//1. Middleware incorporado (Obligatorio)
app.use(express.json());
//2. Middleware de Auditoría (Se ejecuta en TODAS las peticiones)
app.use(logger);
//3. Rutas de la API
app.use('/api/cursos', cursosRoutes);
//Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
//4. Middleware de Manejo de Errores (SIEMPRE va al final, después de las rutas)
app.use(errorHandler);
module.exports = app;