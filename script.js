// Cargar tareas al iniciar
window.onload = function () {
  const tareasGuardadas = localStorage.getItem("tareas");
  if (tareasGuardadas) {
    const tareas = JSON.parse(tareasGuardadas);
    tareas.forEach(tarea => crearTarea(tarea.texto, tarea.completada));
  }
};

function agregarTarea() {
  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim();

  if (texto === "") {
    alert("Escribe una tarea antes de agregarla.");
    return;
  }

  crearTarea(texto, false);
  guardarTareas();
  input.value = "";
}

function crearTarea(texto, completada) {
  const li = document.createElement("li");

  // Crear un span para el texto editable
  const span = document.createElement("span");
  span.textContent = texto;

  // Doble clic para editar
  span.ondblclick = function () {
  const nuevoTexto = prompt("Editar tarea:", span.textContent);
  if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
      span.textContent = nuevoTexto.trim();
      guardarTareas();
  }
  };

  // Añade el span al <li> en vez de texto directo
  li.appendChild(span);

  if (completada) {
    li.classList.add("completada");
  }

  // Marcar como completada al hacer clic
  li.onclick = function () {
    li.classList.toggle("completada");
    guardarTareas();
    actualizarContador();
  };

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "X";
  btnEliminar.className = "eliminar";
  btnEliminar.onclick = function (event) {
    event.stopPropagation(); // evita que se dispare también el clic del li
    li.remove();
    guardarTareas();
    actualizarContador();
  };

  li.appendChild(btnEliminar);
  document.getElementById("lista-tareas").appendChild(li);
  actualizarContador();
}

function guardarTareas() {
  const tareas = [];
  document.querySelectorAll("#lista-tareas li").forEach(li => {
    const texto = li.querySelector("span").textContent.trim();
    const completada = li.classList.contains("completada");
    tareas.push({ texto, completada });
  });

  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function filtrar(tipo) {
  const tareas = document.querySelectorAll("#lista-tareas li");

  tareas.forEach(tarea => {
    const estaCompletada = tarea.classList.contains("completada");

    if (tipo === "todas") {
      tarea.style.display = "block";
    } else if (tipo === "pendientes") {
      tarea.style.display = estaCompletada ? "none" : "block";
    } else if (tipo === "completadas") {
      tarea.style.display = estaCompletada ? "block" : "none";
    }
  });
}
  
function actualizarContador() {
const totalPendientes = Array.from(document.querySelectorAll("#lista-tareas li"))
  .filter(li => !li.classList.contains("completada")).length;

document.getElementById("contador").textContent = `Tareas pendientes: ${totalPendientes}`;
}



  