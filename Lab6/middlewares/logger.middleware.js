//middlewares/logger.middleware.js
const logger = (req, res, next) => {
  //1. Guardamos la hora exacta en la que entra la petición
  const inicio = Date.now();
  //2. Escuchamos el evento 'finish' (cuando la respuesta ya se envió al cliente)
  res.on('finish', () => {
    // 3. Calculamos cuánto tiempo pasó
    const tiempo = Date.now() - inicio;
    //4. Imprimimos en consola usando concatenación normal
    console.log("[AUDITORÍA] " + req.method + " " + req.originalUrl + " - Estado: " + res.statusCode + " - Tiempo: " + tiempo + "ms");
  });

  //5. Le decimos a Express que continúe
  next();
};
module.exports = logger;