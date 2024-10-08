const taskForm = document.getElementById("task-form");

const taskList = document.getElementById("task-list");

loasTasks();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskInput = document.getElementById("task-input");

  const task = taskInput.value;
  console.log(task);

  if (task) {
    taskList.append(createTaskElement(task));
    storeTaskInLocalStorage(task);
    taskInput.value = "";
  }
});

function createTaskElement(task) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  li.textContent = task;
  div.append(
    createButton("❌", "delete-btn btn-secundario"),
    createButton("✏️", "edit-btn btn-secundario")
  );
  li.append(div);

  return li;
}

function createButton(text, className) {
  const btn = document.createElement("span");
  btn.textContent = text;
  btn.className = className;
  return btn;
}

taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    deleteTask(event.target.closest("li"));
    //deleteTask(event.target.parentElement.parentElement);
  } else if (event.target.classList.contains("edit-btn")) {
    editTask(event.target.closest("li"));
  }
});

function deleteTask(taskItem) {
  if (confirm("¿Confirmas que deseas eliminar?")) {
    taskItem.remove();
  }
  updateLocalStorage();
}

function editTask(taskItem) {
  const newTask = prompt("Edita la tarea:", taskItem.firstChild.textContent);
  if (newTask !== null) {
    taskItem.firstChild.textContent = newTask;
  }
  updateLocalStorage();
}

//LocalStorage
function storeTaskInLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loasTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

function updateLocalStorage() {
  const tasks = Array.from(taskList.querySelectorAll("li")).map(
    (li) => li.firstChild.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const themeToggleButton = document.getElementById("toggle-theme-btn");

const currentTheme = localStorage.getItem("theme");

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const theme = document.body.classList.contains("dark-theme")
    ? "dark"
    : "light";

  localStorage.setItem("theme", theme);
});

if (currentTheme === "dark") {
  document.body.classList.add("dark-theme");
}
