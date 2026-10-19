const http = require('http');

const servidor = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(`
        <h1>Mi servidor Node.js</h1>
        <p>Servidor funcionando correctamente.</p>
    `);
});

servidor.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});