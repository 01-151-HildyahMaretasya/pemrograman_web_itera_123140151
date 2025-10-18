const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search");
const filterStatus = document.getElementById("filter-status");
const countPending = document.getElementById("count-pending");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  let filteredTasks = tasks.filter((task) => {
    const matchSearch = task.course
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
    const matchStatus =
      filterStatus.value === "all" ||
      (filterStatus.value === "done" && task.done) ||
      (filterStatus.value === "pending" && !task.done);
    return matchSearch && matchStatus;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    const info = document.createElement("div");
    info.classList.add("task-info");
    info.innerHTML = `
      <h4 class="${task.done ? "done" : ""}">${task.name}</h4>
      <small>${task.course} — Deadline: ${task.deadline}</small>
    `;

    const actions = document.createElement("div");
    actions.classList.add("actions");
    actions.innerHTML = `
      <button onclick="toggleDone(${index})">${
      task.done ? "Belum" : "Selesai"
    }</button>
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Hapus</button>
    `;

    li.appendChild(info);
    li.appendChild(actions);
    taskList.appendChild(li);
  });

  countPending.textContent = tasks.filter((t) => !t.done).length;
}

function addTask(e) {
  e.preventDefault();
  const name = document.getElementById("task-name").value.trim();
  const course = document.getElementById("course").value.trim();
  const deadline = document.getElementById("deadline").value;

  if (!name || !course || !deadline) {
    alert("Harap isi semua kolom dengan benar!");
    return;
  }

  tasks.push({ name, course, deadline, done: false });
  saveTasks();
  renderTasks();
  form.reset();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newName = prompt("Ubah nama tugas:", tasks[index].name);
  const newCourse = prompt("Ubah mata kuliah:", tasks[index].course);
  const newDeadline = prompt(
    "Ubah deadline (YYYY-MM-DD):",
    tasks[index].deadline
  );

  if (!newName || !newCourse || !newDeadline) {
    alert("Semua field harus diisi!");
    return;
  }

  tasks[index] = {
    ...tasks[index],
    name: newName,
    course: newCourse,
    deadline: newDeadline,
  };
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Yakin ingin menghapus tugas ini?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

form.addEventListener("submit", addTask);
searchInput.addEventListener("input", renderTasks);
filterStatus.addEventListener("change", renderTasks);

renderTasks();
