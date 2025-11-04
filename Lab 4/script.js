class Task {
  constructor(name, desc) {
    this.id = Date.now() + Math.floor(Math.random() * 1000);
    this.name = name;
    this.desc = desc;
    this.completed = false;
  }
}

const tasks = [];
const nameInput = document.getElementById("task-name");
const descInput = document.getElementById("task-desc");
const addBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

function addTask(name, desc) {
  if (!name.trim()) return;
  tasks.push(new Task(name.trim(), desc.trim()));
  nameInput.value = descInput.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <div class="task-title">${task.name}</div>
      <div class="task-desc">${task.desc}</div>
      <div class="task-actions">
        <button class="task-btn done">${task.completed ? "Undo" : "Done"}</button>
        <button class="task-btn danger delete">Delete</button>
      </div>
    `;

    li.querySelector(".done").onclick = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    li.querySelector(".delete").onclick = () => {
      tasks.splice(tasks.findIndex(t => t.id === task.id), 1);
      renderTasks();
    };

    taskList.appendChild(li);
  });
}

addBtn.onclick = () => addTask(nameInput.value, descInput.value);
