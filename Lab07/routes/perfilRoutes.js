const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getPerfil } = require('../controllers/perfilController');
//Ruta protegida
router.get('/', authMiddleware, getPerfil);
module.exports = router;
