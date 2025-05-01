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
  li.textContent = texto;

  if (completada) {
    li.classList.add("completada");
  }

  // Marcar como completada al hacer clic
  li.onclick = function () {
    li.classList.toggle("completada");
    guardarTareas();
  };

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "X";
  btnEliminar.className = "eliminar";
  btnEliminar.onclick = function (event) {
    event.stopPropagation(); // evita que se dispare también el clic del li
    li.remove();
    guardarTareas();
  };

  li.appendChild(btnEliminar);
  document.getElementById("lista-tareas").appendChild(li);
}

function guardarTareas() {
  const tareas = [];
  document.querySelectorAll("#lista-tareas li").forEach(li => {
    const texto = li.childNodes[0].nodeValue.trim();
    const completada = li.classList.contains("completada");
    tareas.push({ texto, completada });
  });

  localStorage.setItem("tareas", JSON.stringify(tareas));
}



  