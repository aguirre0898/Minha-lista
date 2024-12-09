// Seleção de elementos
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Função para carregar tarefas do localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.deadline}</td>
      <td>${task.priority}</td>
      <td class="actions">
        <button class="edit" onclick="editTask(${index})">Editar</button>
        <button class="delete" onclick="deleteTask(${index})">Excluir</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}

// Função para adicionar tarefa
function addTask(e) {
  e.preventDefault();
  const name = document.getElementById("task-name").value;
  const deadline = document.getElementById("task-deadline").value;
  const priority = document.getElementById("task-priority").value;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ name, deadline, priority });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskForm.reset();
  loadTasks();
}

// Função para editar tarefa
function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks[index];

  document.getElementById("task-name").value = task.name;
  document.getElementById("task-deadline").value = task.deadline;
  document.getElementById("task-priority").value = task.priority;

  deleteTask(index);
}

// Função para excluir tarefa
function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// Event listener para o formulário
taskForm.addEventListener("submit", addTask);

// Carregar tarefas ao inicializar a página
document.addEventListener("DOMContentLoaded", loadTasks);