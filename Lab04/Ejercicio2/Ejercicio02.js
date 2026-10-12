// 1.Arreglo global de tareas
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
const form = document.getElementById("formTarea");
const alertas = document.getElementById("alertas");
const lista = document.getElementById("listaTareas");
//2. Interceptamos y validamos el formulario
form.addEventListener("submit", e => {
    e.preventDefault();
    alertas.innerHTML = "";
    const titulo = document.getElementById("titulo").value.trim();
    const curso = document.getElementById("curso").value.trim();
    const fecha = document.getElementById("fechaEntrega").value;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    let errores = [];
    if (!titulo) errores.push("Ingrese el titulo.");
    if (!curso) errores.push("Ingrese el curso.");
    if (!fecha) {
        errores.push("Ingrese la fecha.");
    } else if (new Date(fecha + "T00:00:00") <= hoy) {
        errores.push("La fecha debe ser posterior a hoy.");
    }
    if (errores.length > 0) {
        alertas.innerHTML = errores
            .map(error => `<p style="color:red">${error}</p>`)
            .join("");
        return;
    }
    tareas.push({
        id: Date.now(),
        titulo,
        curso,
        fechaEntrega: fecha,
        completada: false
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
    alertas.textContent = "Tarea agregada exitosamente.";
    alertas.style.color = "green";

    form.reset();
    mostrar();
});
//3.Mostramos las tareas usando map
function mostrar() {
    lista.innerHTML = tareas.map(t =>
        `<p>${t.titulo} - ${t.curso} - ${t.fechaEntrega}</p>`
    ).join("");
}
mostrar();