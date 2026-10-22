//Importamos la capa de datos (solo el controlador puede llamarla)
const cursosData = require('../data/cursos.data');
//1. GET /api/cursos
exports.listarCursos = (req, res) => {
  let resultado = cursosData.findAll();
  const { creditos, nombre, codigo } = req.query;
  if (creditos) resultado = resultado.filter(c => c.creditos === Number(creditos));
  if (nombre) resultado = resultado.filter(c => c.nombre.toLowerCase().includes(nombre.toLowerCase()));
  if (codigo) resultado = resultado.filter(c => c.codigo.toLowerCase() === codigo.toLowerCase());
  res.status(200).json(resultado);
};
//2. GET /api/cursos/:id
exports.obtenerCurso = (req, res) => {
  const id = Number(req.params.id);
  const curso = cursosData.findById(id);
  if (!curso) {
    return res.status(404).json({ error: `Curso con id ${id} no encontrado` });
  }
  res.status(200).json(curso);
};
//3. POST /api/cursos
exports.crearCurso = (req, res) => {
  const { nombre, codigo, creditos } = req.body;
  //Validación de campos obligatorios
  if (!nombre || !codigo || !creditos) {
    return res.status(400).json({
      error: 'Los campos nombre, codigo y creditos son obligatorios'
    });
  }
  if (typeof creditos !== 'number') {
    return res.status(400).json({ error: 'El campo creditos debe ser un número' });
  }
  //Validar que el código no exista ya
  if (cursosData.findByCodigo(codigo)) {
    return res.status(400).json({ error: `El código ${codigo} ya existe` });
  }
  const nuevo = cursosData.create({ nombre, codigo, creditos });
  res.status(201).json(nuevo);
};
//4. PUT /api/cursos/:id
exports.actualizarCurso = (req, res) => {
  const id = Number(req.params.id);
  const actualizado = cursosData.update(id, req.body);
  if (!actualizado) {
    return res.status(404).json({ error: `Curso con id ${id} no encontrado` });
  }
  res.status(200).json(actualizado);
};
//5. DELETE /api/cursos/:id
exports.eliminarCurso = (req, res) => {
  const id = Number(req.params.id);
  const eliminado = cursosData.remove(id);
  if (!eliminado) {
    return res.status(404).json({ error: `Curso con id ${id} no encontrado` });
  }
  res.status(200).json({
    mensaje: 'Curso eliminado correctamente',
    curso: eliminado
  });
};