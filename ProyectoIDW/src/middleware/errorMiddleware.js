// Middleware para rutas no encontradas (404)
export const notFoundHandler = function (req, res, next) {
    res.status(404).json({
        success: false,
        message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    });
};

// Middleware global de manejo de errores 
export const errorHandler = function (err, req, res, next) {
    console.error('Error no controlado:', err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    });
};