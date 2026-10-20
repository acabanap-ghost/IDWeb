const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const server = http.createServer((req, res) => {
  let archivo = 'index.html';
  if (req.url !== '/') {
    archivo = req.url.replace('/', '');
  }
  const rutaCompleta = path.join(__dirname, 'public', archivo);
  //Aquí inferimos el Content-Type
  let contentType = 'text/html';
  if (archivo.endsWith('.css')) {
    contentType = 'text/css';
  }
  //Lectura asíncrona
  fs.readFile(rutaCompleta, (error, contenido) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Archivo no encontrado');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(contenido);
    }
  });
});
server.listen(PORT, () => {
  console.log('Servidor en http://localhost:3000');
});