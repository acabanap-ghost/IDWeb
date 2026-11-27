import authServices from '../services/authServices.js';

// Registra un nuevo usuario en el sistema
const register = async function (req, res) {
    try {
        const { username, lastname, correo, password } = req.body;
        const user = await authServices.registerService(username, lastname, correo, password);
        res.status(201).json({
            success: true,
            data: user,
            message: 'Usuario registrado exitosamente'
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Inicia sesión y guarda los datos del usuario en req.session
const login = async function (req, res) {
    try {
        const { correo, password } = req.body;
        const user = await authServices.loginService(correo, password);
        req.session.user = user;
        res.status(200).json({
            success: true,
            data: user,
            message: 'Inicio de sesión exitoso'
        });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

// Devuelve los datos del usuario autenticado en la sesión actual
const getMe = async function (req, res) {
    try {
        const user = await authServices.getUser(req.session);
        res.status(200).json({
            success: true,
            data: user,
            message: 'Sesión activa'
        });
    } catch (error) {
        res.status(401).json({ success: false, message: 'No hay sesión activa' });
    }
};

// Destruye la sesión en el servidor y limpia la cookie en el cliente
const logout = async function (req, res) {
    try {
        await authServices.logoutService(req);
        res.clearCookie('connect.sid');
        res.status(200).json({
            success: true,
            data: null,
            message: 'Cierre de sesión exitoso'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
    }
};

export default {
    register,
    login,
    getMe,
    logout
};