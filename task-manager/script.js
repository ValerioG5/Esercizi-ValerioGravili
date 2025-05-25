/**
 * Riferimenti agli elementi del DOM utilizzati nell'applicazione.
 * @const {HTMLInputElement} taskInput - Campo input per inserire nuove attività.
 * @const {HTMLButtonElement} addTaskBtn - Bottone per aggiungere una nuova attività.
 * @const {HTMLSelectElement} filterSelect - Menu a tendina per filtrare le attività per stato.
 * @const {HTMLInputElement} searchInput - Campo input per cercare attività per nome.
 * @const {HTMLButtonElement} searchBtn - Bottone per eseguire la ricerca.
 */
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const filterSelect = document.getElementById("filter-select");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

/**
 * Oggetto contenente le colonne delle attività divise per stato.
 * @const {Object<string, HTMLElement>} columns - Colonne "todo", "inprogress", "done".
 */
const columns = {
  todo: document.querySelector("#todo"),
  inprogress: document.querySelector("#inprogress"),
  done: document.querySelector("#done")
};

/**
 * Array che contiene tutte le attività.
 * @type {Array<{id: string, name: string, status: string}>}
 */
let tasks = [];

// Event listener per il pulsante di ricerca
searchBtn.addEventListener("click", () => {
  updateColumns();
});

/**
 * Crea un elemento DOM per una task.
 * @param {{id: string, name: string, status: string}} task - L'oggetto attività.
 * @returns {HTMLLIElement} - L'elemento della lista DOM creato.
 */
function createTaskElement(task) {
  const li = document.createElement("li");
  const nameSpan = document.createElement("span");
  nameSpan.textContent = task.name;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", () => removeTask(task.id));

  // Modifica del nome con doppio click
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

/**
 * Aggiunge una nuova attività alla lista.
 * Recupera il valore dell'input, crea un nuovo oggetto task e aggiorna le colonne.
 */
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

/**
 * Rimuove un'attività dall'elenco.
 * @param {string} id - ID della task da rimuovere.
 */
function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  updateColumns();
}

/**
 * Aggiorna la visualizzazione delle colonne task in base al filtro selezionato e alla ricerca.
 * Svuota le colonne, applica i filtri e ripopola le attività.
 */
function updateColumns() {
  Object.values(columns).forEach(column => column.querySelector(".task-list").innerHTML = "");

  const filtro = filterSelect.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  tasks.forEach(task => {
    if (
      (filtro === "all" || task.status === filtro) &&
      (searchTerm === "" || task.name.toLowerCase().includes(searchTerm))
    ) {
      const taskElement = createTaskElement(task);
      columns[task.status].querySelector(".task-list").appendChild(taskElement);
    }
  });

  Object.keys(columns).forEach(key => {
    columns[key].style.display = (filtro === "all" || filtro === key) ? "block" : "none";
  });
}

/**
 * Inizializza il drag and drop per ogni colonna delle attività.
 * Aggiorna lo stato della task al rilascio.
 */
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

// Event listeners per interazioni dell'utente
addTaskBtn.addEventListener("click", addTask);
filterSelect.addEventListener("change", updateColumns);
