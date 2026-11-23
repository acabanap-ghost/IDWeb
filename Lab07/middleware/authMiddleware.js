const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: 'No autorizado. Inicia sesión primero.'
        });
    }

    next();
};
module.exports = authMiddleware;
