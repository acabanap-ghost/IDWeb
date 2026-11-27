import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import catalogoRoutes from './routes/catalogoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Configuración de CORS para permitir peticiones con cookies desde el frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5500',
  credentials: true
}));

// Parseo del cuerpo de las peticiones en formato JSON
app.use(express.json());

// Configuración de sesiones en memoria
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto_por_defecto',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}));

// Archivos estáticos del frontend (public/index.html, css, js)
app.use(express.static('public'));

// Ruta base para verificar el estado del servidor (mientras no exista public/index.html)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Servidor activo en el puerto ${process.env.PORT || 3000}`
  });
});

// Rutas principales de la API
app.use('/api/auth', authRoutes);
app.use('/api/catalogo', catalogoRoutes);

// Manejo de rutas inexistentes y errores globales
app.use(notFoundHandler);
app.use(errorHandler);

export default app;