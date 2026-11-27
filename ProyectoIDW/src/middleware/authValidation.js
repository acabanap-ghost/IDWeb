// Validación de campos para el registro de usuarios
export const validateCamposRegister = function (req, res, next) {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ success: false, message: 'El cuerpo de la solicitud está vacío' });
    }

    if (!body.username || !body.lastname || !body.correo || !body.password) {
        return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
    }

    if (typeof body.correo !== 'string' || !body.correo.includes('@')) {
        return res.status(400).json({ success: false, message: 'El correo electrónico no es válido' });
    }

    if (typeof body.password !== 'string' || body.password.length < 6) {
        return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    next();
};

// Validación de campos para el inicio de sesión
export const validateCamposLogin = function (req, res, next) {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ success: false, message: 'El cuerpo de la solicitud está vacío' });
    }

    if (!body.correo || !body.password) {
        return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
    }

    if (typeof body.correo !== 'string' || !body.correo.includes('@')) {
        return res.status(400).json({ success: false, message: 'El correo electrónico no es válido' });
    }

    if (typeof body.password !== 'string' || body.password.length < 6) {
        return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    next();
};

// Verifica que exista una sesión de usuario activa
export const validateSession = function (req, res, next) {
    const user = req.session?.user;

    if (!user) {
        return res.status(401).json({ success: false, message: 'No se ha iniciado sesión' });
    }

    next();
};

// Verifica que el usuario autenticado tenga rol de administrador
export const roleValidation = function (req, res, next) {
    const user = req.session?.user;

    if (!user || user.rol !== 'admin') {
        return res.status(403).json({ success: false, message: 'No tienes permisos para acceder a esta ruta' });
    }

    next();
};