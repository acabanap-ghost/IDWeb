// Valida que el parámetro :id de la URL sea un número entero positivo
export const validateIdParam = function (req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ success: false, message: 'El ID proporcionado no es válido' });
    }

    next();
};

// Valida los campos requeridos para crear o actualizar un elemento del catálogo
export const validateBody = function (req, res, next) {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ success: false, message: 'El cuerpo de la solicitud está vacío' });
    }

    const { nombre, descripcion, categoria, precio } = body;

    if (!nombre || !descripcion || !categoria || precio === undefined) {
        return res.status(400).json({ success: false, message: 'Faltan campos requeridos (nombre, descripcion, categoria, precio)' });
    }

    if (typeof precio !== 'number' || precio < 0) {
        return res.status(400).json({ success: false, message: 'El precio debe ser un número mayor o igual a 0' });
    }

    next();
};