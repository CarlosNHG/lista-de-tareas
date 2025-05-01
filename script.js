// Cargar tareas al iniciar
window.onload = function () {
  const tareasGuardadas = localStorage.getItem("tareas");
  if (tareasGuardadas) {
    const tareas = JSON.parse(tareasGuardadas);
    tareas.forEach(tarea => crearTarea(tarea));
  }
};

function agregarTarea() {
  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim();

  if (texto === "") {
    alert("Escribe una tarea antes de agregarla.");
    return;
  }

  crearTarea(texto);
  guardarTareas();
  input.value = "";
}

function crearTarea(texto) {
  const li = document.createElement("li");
  li.textContent = texto;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "X";
  btnEliminar.className = "eliminar";
  btnEliminar.onclick = function () {
    li.remove();
    guardarTareas();
  };

  li.appendChild(btnEliminar);

  document.getElementById("lista-tareas").appendChild(li);
}

function guardarTareas() {
  const tareas = [];
  document.querySelectorAll("#lista-tareas li").forEach(li => {
    const texto = li.childNodes[0].nodeValue.trim(); // solo el texto sin el botón
    tareas.push(texto);
  });

  localStorage.setItem("tareas", JSON.stringify(tareas));
}


  