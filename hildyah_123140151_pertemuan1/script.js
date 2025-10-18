const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const filterStatus = document.getElementById("filterStatus");
const searchTask = document.getElementById("searchTask");
const taskStats = document.getElementById("taskStats");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  const filter = filterStatus.value;
  const search = searchTask.value.toLowerCase();

  const filteredTasks = tasks.filter((t) => {
    const matchStatus =
      filter === "all" ||
      (filter === "completed" && t.completed) ||
      (filter === "pending" && !t.completed);
    const matchSearch =
      t.name.toLowerCase().includes(search) ||
      t.course.toLowerCase().includes(search);
    return matchStatus && matchSearch;
  });

  filteredTasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task" + (task.completed ? " completed" : "");
    div.innerHTML = `
      <div class="task-info">
        <strong>${task.name}</strong><br>
        <small>${task.course} • ${task.deadline}</small>
      </div>
      <div class="task-actions">
        <button onclick="toggleTask(${index})">${
      task.completed ? "↩" : "✔"
    }</button>
        <button onclick="editTask(${index})">✏</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(div);
  });

  const pendingCount = tasks.filter((t) => !t.completed).length;
  taskStats.textContent = `📌 ${pendingCount} tugas belum selesai`;
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const t = tasks[index];
  const newName = prompt("Edit Nama Tugas:", t.name);
  const newCourse = prompt("Edit Mata Kuliah:", t.course);
  const newDeadline = prompt("Edit Deadline (YYYY-MM-DD):", t.deadline);

  if (newName && newCourse && newDeadline) {
    t.name = newName;
    t.course = newCourse;
    t.deadline = newDeadline;
    saveTasks();
    renderTasks();
  }
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("taskName").value.trim();
  const course = document.getElementById("taskCourse").value.trim();
  const deadline = document.getElementById("taskDeadline").value;

  if (!name || !course || !deadline) {
    alert("Semua kolom wajib diisi!");
    return;
  }

  tasks.push({ name, course, deadline, completed: false });
  saveTasks();
  taskForm.reset();
  renderTasks();
});

filterStatus.addEventListener("change", renderTasks);
searchTask.addEventListener("input", renderTasks);

renderTasks();
