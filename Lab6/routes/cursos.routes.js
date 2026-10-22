const express = require('express');
const router = express.Router();
//Importamos el controlador
const controller = require('../controllers/cursos.controller');
//Definimos los endpoints (solo mapean URL -> Controlador)
router.get('/', controller.listarCursos);
router.get('/:id', controller.obtenerCurso);
router.post('/', controller.crearCurso);
router.put('/:id', controller.actualizarCurso);
router.delete('/:id', controller.eliminarCurso);
module.exports = router;