import catalogoRepository from '../repositories/catalogoRepository.js';

// Obtiene la lista completa o filtrada del catálogo
async function listarCatalogo(filtros) {
    try {
        return await catalogoRepository.listar(filtros);
    } catch (error) {
        console.error('Error en listarCatalogo:', error);
        throw error;
    }
}

// Obtiene un elemento por ID o lanza error 404 si no existe
async function obtenerElementoPorId(id) {
    try {
        const elemento = await catalogoRepository.obtenerPorId(id);
        if (!elemento) {
            const error = new Error('No se encontró el elemento solicitado');
            error.statusCode = 404;
            throw error;
        }
        return elemento;
    } catch (error) {
        console.error('Error en obtenerElementoPorId:', error);
        throw error;
    }
}

// Registra un nuevo elemento en el catálogo
async function crearElemento(datos) {
    try {
        return await catalogoRepository.crear(datos);
    } catch (error) {
        console.error('Error en crearElemento:', error);
        throw error;
    }
}

// Actualiza un elemento existente o lanza error 404 si no existe
async function actualizarElemento(id, datos) {
    try {
        const actualizado = await catalogoRepository.actualizar(id, datos);
        if (!actualizado) {
            const error = new Error('No se encontró el elemento a actualizar');
            error.statusCode = 404;
            throw error;
        }
        return actualizado;
    } catch (error) {
        console.error('Error en actualizarElemento:', error);
        throw error;
    }
}

// Elimina un elemento existente o lanza error 404 si no existe
async function eliminarElemento(id) {
    try {
        const eliminado = await catalogoRepository.eliminar(id);
        if (!eliminado) {
            const error = new Error('No se encontró el elemento a eliminar');
            error.statusCode = 404;
            throw error;
        }
        return true;
    } catch (error) {
        console.error('Error en eliminarElemento:', error);
        throw error;
    }
}

export default {
    listarCatalogo,
    obtenerElementoPorId,
    crearElemento,
    actualizarElemento,
    eliminarElemento
};