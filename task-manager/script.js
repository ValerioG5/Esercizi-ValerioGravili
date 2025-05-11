
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filterSelect = document.getElementById("filter-select");
const searchInput = document.getElementById("search-input");
let tasks = [];

function renderTask(task) {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = task.name;
  

    const statusSelect = document.createElement("select");
    statusSelect.innerHTML = `
      <option value="todo" ${task.status === "todo" ? "selected" : ""}>Da fare</option>
      <option value="inprogress" ${task.status === "inprogress" ? "selected" : ""}>In corso</option>
      <option value="done" ${task.status === "done" ? "selected" : ""}>Completata</option>
    `;
  
    statusSelect.addEventListener("change", () => {
      task.status = statusSelect.value;
      updateTaskList();
    });
  

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      removeTask(task.id);
    });
  
  
    li.appendChild(nameSpan);
    li.appendChild(statusSelect);
    li.appendChild(deleteBtn);
  
    taskList.appendChild(li);
  }
function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName === ""){return}

  const newTask = {
    id: Date.now(),     
    name: taskName,
    status: "todo"       
  };

  tasks.push(newTask);     
  taskInput.value = "";   
  updateTaskList();        
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  updateTaskList();
}


function updateTaskList() {
    taskList.innerHTML = "";
  
    const filtro = filterSelect.value;
    const searchTerm = searchInput.value.toLowerCase();
  
    const tasksFiltrate = tasks.filter(task => {
      const statoOk = filtro === "all" || task.status === filtro;
      const nomeOk = task.name.toLowerCase().includes(searchTerm);
      return statoOk && nomeOk;
    });
  
    tasksFiltrate.forEach(renderTask);
  }
  

addTaskBtn.addEventListener("click", addTask); //aggiungo qui l evento on click
filterSelect.addEventListener("change", updateTaskList);
searchInput.addEventListener("input", updateTaskList);