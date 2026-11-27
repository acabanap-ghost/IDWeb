import { Router } from 'express';
import catalogoControllers from '../controllers/catalogoControllers.js';
import { validateBody, validateIdParam } from '../middleware/validationData.js';
import { validateSession, roleValidation } from '../middleware/authValidation.js';

const router = Router();

// Rutas de consulta con sesión activa
router.get('/', validateSession, catalogoControllers.obtenerCatalogo);
router.get('/:id', validateSession, validateIdParam, catalogoControllers.obtenerElementoPorId);

// Rutas de administración con sesión activa y rol admin
router.post('/', validateSession, roleValidation, validateBody, catalogoControllers.crearElemento);
router.put('/:id', validateSession, roleValidation, validateIdParam, validateBody, catalogoControllers.actualizarElemento);
router.delete('/:id', validateSession, roleValidation, validateIdParam, catalogoControllers.eliminarElemento);

export default router;