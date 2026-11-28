// CONFIGURACIÓN DE LA API
const API_URL = "/api";
// Función general para realizar solicitudes
async function solicitarAPI(ruta, opciones = {}) {
    try {
        const respuesta = await fetch(`${API_URL}${ruta}`, {
            ...opciones,
            // Permite enviar y recibir cookies de sesión
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...opciones.headers
            }
        });
        // Convertimos la respuesta a JSON
        const resultado = await respuesta.json();
        // Comprobamos si ocurrió un error
        if (!respuesta.ok) {
            throw new Error(
                resultado.message || "Error en la solicitud"
            );
        }
        return resultado;
    } catch (error) {
        console.error("Error en la API:", error);
        throw error;
    }
}
// FUNCIONES DEL CATÁLOGO
export async function obtenerProductos() {
    return await solicitarAPI("/catalogo");
}
export async function obtenerProducto(id) {
    return await solicitarAPI(`/catalogo/${id}`);
}
export async function crearProducto(datos) {
    return await solicitarAPI("/catalogo", {
        method: "POST",
        body: JSON.stringify(datos)
    });
}
export async function actualizarProducto(id, datos) {
    return await solicitarAPI(`/catalogo/${id}`, {
        method: "PUT",
        body: JSON.stringify(datos)
    });
}
export async function eliminarProducto(id) {
    return await solicitarAPI(`/catalogo/${id}`, {
        method: "DELETE"
    });
}
// FUNCIONES DE AUTENTICACIÓN
export async function iniciarSesion(datos) {
    return await solicitarAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify(datos)
    });
}
export async function registrarUsuario(datos) {
    return await solicitarAPI("/auth/registro", {
        method: "POST",
        body: JSON.stringify(datos)
    });
}
export async function cerrarSesion() {
    return await solicitarAPI("/auth/logout", {
        method: "POST"
    });
}