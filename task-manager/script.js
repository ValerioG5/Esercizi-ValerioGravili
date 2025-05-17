//costanti per gli elementi del DOM
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const filterSelect = document.getElementById("filter-select");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
  updateColumns();
});
const columns = {
  todo: document.querySelector("#todo"),
  inprogress: document.querySelector("#inprogress"),
  done: document.querySelector("#done")
};

let tasks = [];

// Crea un elemento per la task
function createTaskElement(task) {
  const li = document.createElement("li");
  const nameSpan = document.createElement("span");
  nameSpan.textContent = task.name;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", () => removeTask(task.id));

  //Modifica del nome con doppio click
  nameSpan.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.name;

    input.addEventListener("blur", () => {
      task.name = input.value;
      updateColumns();
    });

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        task.name = input.value;
        updateColumns();
      }
    });

    li.replaceChild(input, nameSpan);
    input.focus();
  });

  li.appendChild(nameSpan);
  li.appendChild(deleteBtn);

  li.draggable = true;
  li.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", task.id);
  });

  return li;
}

// Aggiunge una nuova task
function addTask() {
  const taskName = taskInput.value.trim();
  if (!taskName) return;

  const newTask = {
    id: Date.now().toString(),
    name: taskName,
    status: "todo"
  };

  tasks.push(newTask);
  taskInput.value = "";
  filterSelect.value = "all";
  updateColumns();
}

// Rimuove una task
function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  updateColumns();
}

// Aggiorna le colonne
function updateColumns() {
  Object.values(columns).forEach(column => column.querySelector(".task-list").innerHTML = "");

  // Prendo i valori del filtro e della ricerca
  const filtro = filterSelect.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  tasks.forEach(task => {
    // Filtro per stato e per contenuto
    if (
      (filtro === "all" || task.status === filtro) &&
      (searchTerm === "" || task.name.toLowerCase().includes(searchTerm))
    ) {
      const taskElement = createTaskElement(task);
      columns[task.status].querySelector(".task-list").appendChild(taskElement);
    }
  });

  // Visualizzazione delle colonne in base al filtro
  Object.keys(columns).forEach(key => {
    columns[key].style.display = (filtro === "all" || filtro === key) ? "block" : "none";
  });
}

// Drag and Drop
Object.keys(columns).forEach(status => {
  const column = columns[status];

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    const id = e.dataTransfer.getData("text/plain");
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      updateColumns();
    }
  });
});

// Event Listener
addTaskBtn.addEventListener("click", addTask);
filterSelect.addEventListener("change", updateColumns);
