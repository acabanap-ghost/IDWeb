require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;
//Permitimos recibir datos en formato JSON
app.use(express.json());
//Configuraramos las sesiones
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        }
    })
);
//Importamos las rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
//Iniciamos el servidor
app.listen(PORT, () => {
    console.log('Servidor funcionando en http://localhost:' + PORT);
});