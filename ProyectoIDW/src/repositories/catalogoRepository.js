// Almacenamiento temporal del catálogo en memoria
let catalogo = [
    {
        id: 1,
        nombre: "Academia de Básquet",
        descripcion: "Clases deportivas",
        categoria: "Basquet",
        precio: 80,
        estado: "activo"
    },
    {
        id: 2,
        nombre: "Clases de Aeróbicos",
        descripcion: "Actividad física grupal",
        categoria: "Aerobicos",
        precio: 50,
        estado: "activo"
    }
];

// Obtiene todos los elementos del catálogo 
async function listar(filtros = {}) {
    let resultado = [...catalogo];

    if (filtros.categoria) {
        resultado = resultado.filter(
            item => item.categoria.toLowerCase() === filtros.categoria.toLowerCase()
        );
    }

    if (filtros.estado) {
        resultado = resultado.filter(
            item => item.estado.toLowerCase() === filtros.estado.toLowerCase()
        );
    }

    return resultado;
}

// Busca un elemento específico por su ID
async function obtenerPorId(id) {
    return catalogo.find(item => item.id === Number(id)) || null;
}

// Crea y guarda un nuevo elemento en el catálogo
async function crear(datos) {
    const nuevoId = catalogo.length > 0 ? Math.max(...catalogo.map(item => item.id)) + 1 : 1;
    const nuevo = {
        id: nuevoId,
        ...datos,
        estado: datos.estado || "activo"
    };
    catalogo.push(nuevo);
    return nuevo;
}

// Actualiza un elemento existente por su ID
async function actualizar(id, datos) {
    const index = catalogo.findIndex(item => item.id === Number(id));
    if (index === -1) return null;

    catalogo[index] = {
        ...catalogo[index],
        ...datos,
        id: Number(id)
    };
    return catalogo[index];
}

// Elimina un elemento por su ID
async function eliminar(id) {
    const index = catalogo.findIndex(item => item.id === Number(id));
    if (index === -1) return false;

    catalogo.splice(index, 1);
    return true;
}

export default {
    listar,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};