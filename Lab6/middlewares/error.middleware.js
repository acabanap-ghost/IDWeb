//middlewares/error.middleware.js
const errorHandler = (err, req, res, next) => {
  console.error("[ERROR] " + err.message);
  res.status(500).json({
    error: 'Error interno del servidor',
    mensaje: err.message,
    timestamp: new Date().toISOString()
  });
};
module.exports = errorHandler;