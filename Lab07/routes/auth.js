const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout
} = require('../controllers/authController');
//Registro
router.post('/register', register);
//Inicio de sesión
router.post('/login', login);
//CIerre de sesión
router.post('/logout', logout);
module.exports = router;
