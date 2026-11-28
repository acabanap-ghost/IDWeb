import { cargarProductos } from "./productos.js";
document.addEventListener("DOMContentLoaded", () => {
    console.log("Tienda deportiva iniciada correctamente");
    // Cargar catálogo
    cargarProductos();

});