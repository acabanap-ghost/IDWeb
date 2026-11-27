import { Router } from 'express';
import authControllers from '../controllers/authControllers.js';
import { validateCamposRegister, validateCamposLogin, validateSession } from '../middleware/authValidation.js';

const router = Router();

// Rutas públicas de autenticación
router.post('/register', validateCamposRegister, authControllers.register);
router.post('/login', validateCamposLogin, authControllers.login);

// Rutas protegidas que requieren sesión activa
router.post('/logout', validateSession, authControllers.logout);
router.get('/me', validateSession, authControllers.getMe);

export default router;