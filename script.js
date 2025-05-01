function agregarTarea() {
  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim();

  if (texto === "") {
    alert("Escribe una tarea antes de agregarla.");
    return;
  }

  const li = document.createElement("li");
  li.textContent = texto;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "X";
  btnEliminar.className = "eliminar";
  btnEliminar.onclick = function () {
    li.remove();
  };

  li.appendChild(btnEliminar);

  document.getElementById("lista-tareas").appendChild(li);
  input.value = ""; // limpia el campo
}


  