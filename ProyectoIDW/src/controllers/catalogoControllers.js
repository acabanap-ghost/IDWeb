import catalogoServices from '../services/catalogoServices.js';

// Lista todos los elementos del catálogo 
const obtenerCatalogo = async function (req, res) {
    try {
        const lista = await catalogoServices.listarCatalogo(req.query);
        res.status(200).json({
            success: true,
            data: lista,
            message: 'Catálogo obtenido exitosamente'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el catálogo' });
    }
};

// Obtiene el detalle de un elemento por su ID
const obtenerElementoPorId = async function (req, res) {
    try {
        const elemento = await catalogoServices.obtenerElementoPorId(req.params.id);
        res.status(200).json({
            success: true,
            data: elemento,
            message: 'Elemento obtenido exitosamente'
        });
    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).json({ success: false, message: error.message });
    }
};

// Crea un nuevo elemento en el catálogo
const crearElemento = async function (req, res) {
    try {
        const nuevo = await catalogoServices.crearElemento(req.body);
        res.status(201).json({
            success: true,
            data: nuevo,
            message: 'Elemento creado exitosamente'
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Actualiza un elemento existente por su ID
const actualizarElemento = async function (req, res) {
    try {
        const actualizado = await catalogoServices.actualizarElemento(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: actualizado,
            message: 'Elemento actualizado exitosamente'
        });
    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).json({ success: false, message: error.message });
    }
};

// Elimina un elemento por su ID
const eliminarElemento = async function (req, res) {
    try {
        await catalogoServices.eliminarElemento(req.params.id);
        res.status(200).json({
            success: true,
            data: null,
            message: 'Elemento eliminado exitosamente'
        });
    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).json({ success: false, message: error.message });
    }
};

export default {
    obtenerCatalogo,
    obtenerElementoPorId,
    crearElemento,
    actualizarElemento,
    eliminarElemento
};