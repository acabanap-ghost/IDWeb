const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
//Función de ayuda para no repetir código al enviar JSON
function enviarJSON(res, codigo, datos) {
  res.writeHead(codigo, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(datos));
}
const server = http.createServer((req, res) => {
  // EJERCICIO 3: RUTAS DE LA API
  
  //1. RUTA GET /api/estudiantes
  if (req.method === 'GET' && req.url === '/api/estudiantes') {
    const rutaJSON = path.join(__dirname, 'data', 'estudiantes.json');

    //Leemos el archivo de forma asíncrona
    fs.readFile(rutaJSON, 'utf8', (error, contenido) => {
      if (error) {
        enviarJSON(res, 500, { error: 'Error interno al leer el archivo' });
      } else {
        const estudiantes = JSON.parse(contenido);
        enviarJSON(res, 200, estudiantes); // Código 200 OK
      }
    });
    return; //Detenemos aquí para que no siga a las otras rutas
  }
  //2. RUTA POST /api/estudiantes
  if (req.method === 'POST' && req.url === '/api/estudiantes') {
    let cuerpo = '';
    //Capturamos los chunks de datos
    req.on('data', (chunk) => {
      cuerpo = cuerpo + chunk;
    });
    //Cuando termina de llegar el body
    req.on('end', () => {
      const nuevoEstudiante = JSON.parse(cuerpo);
      const rutaJSON = path.join(__dirname, 'data', 'estudiantes.json');
      //Primero leemos los que ya existen
      fs.readFile(rutaJSON, 'utf8', (error, contenido) => {
        let estudiantes = [];
        if (!error) {
          estudiantes = JSON.parse(contenido);
        }
        //Le asignamos un ID nuevo
        nuevoEstudiante.id = estudiantes.length > 0 ? estudiantes[estudiantes.length - 1].id + 1 : 1;
        //Lo agregamos a la lista
        estudiantes.push(nuevoEstudiante);
        //Guardamos la lista actualizada en el archivo
        fs.writeFile(rutaJSON, JSON.stringify(estudiantes, null, 2), (error) => {
          if (error) {
            enviarJSON(res, 500, { error: 'Error al guardar' });
          } else {
            enviarJSON(res, 201, nuevoEstudiante); //Código 201 Created
          }
        });
      });
    });
    return;
  }
  // 3.MANEJO DE RUTAS NO EXISTENTES EN LA API
  if (req.url.startsWith('/api/')) {
    enviarJSON(res, 404, { error: 'Ruta de API no encontrada' }); //Código 404 Not Found
    return;
  }
  // EJERCICIO 2: ARCHIVOS ESTÁTICOS 
  let archivo = 'index.html';
  if (req.url !== '/') {
    archivo = req.url.replace('/', '');
  }
  const rutaCompleta = path.join(__dirname, 'public', archivo);
  let contentType = 'text/html';
  if (archivo.endsWith('.css')) {
    contentType = 'text/css';
  }
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