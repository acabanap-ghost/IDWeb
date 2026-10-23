const app = require('./app');
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
    console.log("API de Cursos: http://localhost:" + PORT + "/api/cursos");
});