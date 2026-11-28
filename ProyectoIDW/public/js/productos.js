// GESTIÓN DEL CATÁLOGO DE PRODUCTOS
import { obtenerProductos } from "./api.js";
// Productos simulados para comenzar
const productosPrueba = [
    {
        id: 1,
        nombre: "Balón de básquet profesional",
        precio: 89.90,
        categoria: "Básquet",
        imagen: "assets/balon.jpg"
    },
    {
        id: 2,
        nombre: "Guantes de entrenamiento",
        precio: 59.90,
        categoria: "Entrenamiento",
        imagen: "assets/guantes.jpg"
    },
    {
        id: 3,
        nombre: "Mancuernas deportivas",
        precio: 120.00,
        categoria: "Fitness",
        imagen: "assets/mancuernas.jpg"
    },
    {
        id: 4,
        nombre: "Rodilleras deportivas",
        precio: 45.00,
        categoria: "Protección",
        imagen: "assets/rodilleras.jpg"
    }
];
// Función para mostrar productos
export function mostrarProductos(lista) {
    const contenedor = document.getElementById("contenedorProductos");
    if (!contenedor) return;
    contenedor.replaceChildren();
    if (lista.length === 0) {
        contenedor.textContent = "No se encontraron productos.";
        return;
    }

    lista.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "producto-card";
        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;
        const precio = document.createElement("p");
        precio.textContent = `S/ ${Number(producto.precio).toFixed(2)}`;
        const categoria = document.createElement("p");
        categoria.textContent = producto.categoria;
        const boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";
        boton.dataset.id = producto.id;
        boton.className = "btn-agregar";

        tarjeta.append(
            imagen,
            nombre,
            precio,
            categoria,
            boton
        );
        contenedor.appendChild(tarjeta);
    });
}
// Función para cargar productos
export async function cargarProductos() {
    try {
        const respuesta = await obtenerProductos();
        const productos = respuesta.data ?? respuesta;
        mostrarProductos(productos);
    } catch (error) {
        console.warn(
            "No se pudo conectar con el backend. Usando datos de prueba."
        );
        mostrarProductos(productosPrueba);
    }
}