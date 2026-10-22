//Datos iniciales
let cursos = [
  { id: 1, nombre: 'Programación I', codigo: 'PROG101', creditos: 4 },
  { id: 2, nombre: 'Base de Datos', codigo: 'BD201', creditos: 3 },
  { id: 3, nombre: 'Redes', codigo: 'RED301', creditos: 4 }
];
//Variable para generar IDs autoincrementales
let nextId = 4;
module.exports = {
  //Retorna todos los cursos
  findAll: () => cursos,
  // Busca un curso por su ID
  findById: (id) => cursos.find(c => c.id === id),
  // Busca un curso por su código (útil para validar duplicados)
  findByCodigo: (codigo) => cursos.find(c => c.codigo === codigo),
  //Crea un nuevo curso
  create: (curso) => {
    const nuevo = { id: nextId++, ...curso };
    cursos.push(nuevo);
    return nuevo;
  },
  //Actualiza un curso existente
  update: (id, datos) => {
    const index = cursos.findIndex(c => c.id === id);
    if (index === -1) return null;
    cursos[index] = { ...cursos[index], ...datos, id };
    return cursos[index];
  },
  //Elimina un curso
  remove: (id) => {
    const index = cursos.findIndex(c => c.id === id);
    if (index === -1) return null;
    return cursos.splice(index, 1)[0];
  }
};