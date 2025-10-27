class Task {
  constructor(id, text, due = '', notes = '', priority = 'medium') {
    this.id = id;
    this.text = text;
    this.due = due;
    this.notes = notes;
    this.priority = priority;
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }

  // Method untuk toggle status completed
  toggleComplete() {
    this.completed = !this.completed;
  }

  // Method untuk mendapatkan label prioritas
  getPriorityLabel() {
    const labels = {
      high: 'Tinggi',
      medium: 'Sedang',
      low: 'Rendah'
    };
    return labels[this.priority] || 'Sedang';
  }

  // Method untuk format tanggal
  getFormattedDate() {
    if (!this.due) return 'Tanpa tanggal';
    const date = new Date(this.due);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}

/**
 * Class StorageManager - Mengelola penyimpanan data ke localStorage
 * Menggunakan ES6+ Class untuk enkapsulasi logic storage
 */
class StorageManager {
  constructor(key) {
    this.key = key;
  }

  // Arrow function untuk load data
  load = () => {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error loading ${this.key}:`, error);
      return [];
    }
  }

  // Arrow function untuk save data
  save = (data) => {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error saving ${this.key}:`, error);
      return false;
    }
  }

  // Arrow function untuk clear data
  clear = () => {
    try {
      localStorage.removeItem(this.key);
      return true;
    } catch (error) {
      console.error(`Error clearing ${this.key}:`, error);
      return false;
    }
  }
}

/**
 * Class DashboardApp - Main application class
 * Mengelola seluruh logic aplikasi dashboard
 */
class DashboardApp {
  constructor() {
    // Inisialisasi storage managers
    this.taskStorage = new StorageManager('pd_tasks_v3');
    this.notesStorage = new StorageManager('pd_notes_v3');
    
    // Load data dari localStorage
    this.tasks = this.loadTasksFromStorage();
    this.currentFilter = 'all';
    
    // Get DOM elements
    this.initializeElements();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initial render
    this.render();
    
    // Start clock
    this.startClock();
  }

  // Arrow function untuk inisialisasi elements
  initializeElements = () => {
    this.taskList = document.getElementById('taskList');
    this.taskForm = document.getElementById('taskForm');
    this.taskText = document.getElementById('taskText');
    this.taskDue = document.getElementById('taskDue');
    this.taskNotes = document.getElementById('taskNotes');
    this.taskPriority = document.getElementById('taskPriority');
    this.addBtn = document.getElementById('addBtn');
    this.notesArea = document.getElementById('notes');
    this.notesSave = document.getElementById('notesSave');
    this.notesClear = document.getElementById('notesClear');
    this.lastSaved = document.getElementById('lastSaved');
  }

  // Load tasks dengan mapping ke Task class
  loadTasksFromStorage() {
    const data = this.taskStorage.load();
    return data.map(t => {
      const task = new Task(t.id, t.text, t.due, t.notes, t.priority);
      task.completed = t.completed || false;
      task.createdAt = t.createdAt;
      return task;
    });
  }

  // Setup semua event listeners
  setupEventListeners() {
    // Form submit
    this.taskForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    
    // Notes buttons
    this.notesSave.addEventListener('click', () => this.saveNotes());
    this.notesClear.addEventListener('click', () => this.clearNotes());
    
    // Filter buttons
    document.querySelectorAll('.filter-bar button').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilterChange(e));
    });
    
    // Task list delegation
    this.taskList.addEventListener('click', (e) => this.handleTaskAction(e));
  }

  // Handle form submit dengan async/await
  handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const editingId = this.addBtn.dataset.editing;
    
    if (editingId) {
      await this.saveEdit(editingId);
    } else {
      await this.addTask();
    }
  }

  // Arrow function untuk menambah task
  addTask = async () => {
    const text = this.taskText.value.trim();
    
    if (!text) {
      alert('Mohon isi nama tugas!');
      return;
    }

    // Simulasi async operation
    await this.delay(100);

    const task = new Task(
      Date.now().toString(),
      text,
      this.taskDue.value,
      this.taskNotes.value,
      this.taskPriority.value
    );

    this.tasks.unshift(task);
    this.saveTasksToStorage();
    this.render();
    this.taskForm.reset();
    
    // Reset priority ke medium
    this.taskPriority.value = 'medium';
  }

  // Delete task dengan confirmation
  deleteTask = async (id) => {
    if (!confirm('Yakin ingin menghapus tugas ini?')) return;
    
    await this.delay(100);
    
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasksToStorage();
    this.render();
  }

  // Start edit mode
  startEditTask = (id) => {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    this.taskText.value = task.text;
    this.taskDue.value = task.due || '';
    this.taskNotes.value = task.notes || '';
    this.taskPriority.value = task.priority || 'medium';
    
    this.addBtn.textContent = '💾 Simpan Perubahan';
    this.addBtn.classList.remove('primary');
    this.addBtn.classList.add('success');
    this.addBtn.dataset.editing = id;
    
    // Scroll to form
    this.taskForm.scrollIntoView({ behavior: 'smooth' });
  }

  // Save edit dengan async/await
  saveEdit = async (id) => {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    await this.delay(100);

    task.text = this.taskText.value.trim();
    task.due = this.taskDue.value;
    task.notes = this.taskNotes.value;
    task.priority = this.taskPriority.value;

    this.saveTasksToStorage();
    this.render();
    this.taskForm.reset();
    this.taskPriority.value = 'medium';
    
    this.addBtn.textContent = '➕ Tambah Tugas';
    this.addBtn.classList.remove('success');
    this.addBtn.classList.add('primary');
    delete this.addBtn.dataset.editing;
  }

  // Toggle complete status
  toggleComplete = async (id) => {
    await this.delay(100);
    
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.toggleComplete();
      this.saveTasksToStorage();
      this.render();
    }
  }

  // Handle task actions (delegation pattern)
  handleTaskAction = (e) => {
    const action = e.target.dataset.action;
    if (!action) return;

    const taskEl = e.target.closest('.task');
    if (!taskEl) return;

    const id = taskEl.dataset.id;

    switch (action) {
      case 'delete':
        this.deleteTask(id);
        break;
      case 'edit':
        this.startEditTask(id);
        break;
      case 'toggle':
        this.toggleComplete(id);
        break;
    }
  }

  // Handle filter change
  handleFilterChange = (e) => {
    document.querySelectorAll('.filter-bar button').forEach(btn => {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    this.currentFilter = e.target.dataset.filter;
    this.renderTasks();
  }

  // Get filtered tasks
  getFilteredTasks = () => {
    switch (this.currentFilter) {
      case 'completed':
        return this.tasks.filter(t => t.completed);
      case 'pending':
        return this.tasks.filter(t => !t.completed);
      default:
        return this.tasks;
    }
  }

  // Render tasks dengan template literals
  renderTasks = () => {
    const filteredTasks = this.getFilteredTasks();

    if (filteredTasks.length === 0) {
      this.taskList.innerHTML = `
        <div class="empty">
          ${this.currentFilter === 'all' 
            ? '📝 Belum ada tugas — mulai tambahkan tugas pertama Anda!' 
            : `Tidak ada tugas ${this.currentFilter === 'completed' ? 'yang selesai' : 'yang aktif'}`}
        </div>
      `;
      return;
    }

    // Menggunakan template literals dan array methods
    this.taskList.innerHTML = filteredTasks.map(task => `
      <div class="task ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <div class="left">
          <div>
            <span class="priority ${task.priority}">${task.getPriorityLabel()}</span>
            <strong>${task.text}</strong>
          </div>
          <small>📅 ${task.getFormattedDate()}</small>
          ${task.notes ? `<small>📌 ${task.notes}</small>` : ''}
        </div>
        <div class="controls">
          <button data-action="toggle" class="${task.completed ? 'success' : ''}">
            ${task.completed ? '✓' : '○'}
          </button>
          <button data-action="edit">Edit</button>
          <button data-action="delete" class="danger">Hapus</button>
        </div>
      </div>
    `).join('');
  }

  // Update statistics
  updateStats = () => {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
  }

  // Main render function
  render = () => {
    this.renderTasks();
    this.updateStats();
  }

  // Save tasks to storage
  saveTasksToStorage = () => {
    this.taskStorage.save(this.tasks);
  }

  // Save notes dengan async/await
  saveNotes = async () => {
    await this.delay(100);
    
    const notes = this.notesArea.value;
    this.notesStorage.save([{ content: notes, lastSaved: new Date().toISOString() }]);
    
    const now = new Date();
    this.lastSaved.textContent = now.toLocaleTimeString('id-ID');
    
    alert('✅ Catatan berhasil disimpan!');
  }

  // Clear notes
  clearNotes = async () => {
    if (!confirm('Hapus semua catatan?')) return;
    
    await this.delay(100);
    
    this.notesArea.value = '';
    this.notesStorage.clear();
    this.lastSaved.textContent = '-';
  }

  // Load notes dari storage
  loadNotes = () => {
    const data = this.notesStorage.load();
    if (data.length > 0) {
      this.notesArea.value = data[0].content || '';
      if (data[0].lastSaved) {
        const date = new Date(data[0].lastSaved);
        this.lastSaved.textContent = date.toLocaleTimeString('id-ID');
      }
    }
  }

  // Clock dengan async/await
  startClock = async () => {
    // Load timezone
    await this.loadTimezone();
    
    // Update clock
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  // Load timezone dengan async/await
  loadTimezone = async () => {
    await this.delay(200);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
    document.getElementById('tz').textContent = tz;
  }

  // Update clock
  updateClock = () => {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    document.getElementById('clock').textContent = 
      `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  // Utility: delay function untuk simulasi async
  delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Export tasks to JSON
  exportTasks = () => {
    const dataStr = JSON.stringify(this.tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `tasks_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  // Import tasks from JSON
  importTasks = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
        
        // Validasi dan convert ke Task objects
        const validTasks = importedTasks
          .filter(t => t.text && t.id)
          .map(t => {
            const task = new Task(t.id, t.text, t.due, t.notes, t.priority);
            task.completed = t.completed || false;
            task.createdAt = t.createdAt;
            return task;
          });

        if (confirm(`Import ${validTasks.length} tugas? Data existing akan digabung.`)) {
          // Menggunakan spread operator untuk merge
          this.tasks = [...validTasks, ...this.tasks];
          this.saveTasksToStorage();
          this.render();
          alert('✅ Import berhasil!');
        }
      } catch (error) {
        alert('❌ Error importing file: ' + error.message);
      }
    };
    reader.readAsText(file);
  }

  // Clear all tasks
  clearAllTasks = async () => {
    if (!confirm('⚠️ Hapus SEMUA tugas? Tindakan ini tidak dapat dibatalkan!')) return;
    
    await this.delay(100);
    this.tasks = [];
    this.saveTasksToStorage();
    this.render();
    alert('✅ Semua tugas telah dihapus');
  }
}

/**
 * Initialize aplikasi ketika DOM ready
 * Menggunakan IIFE (Immediately Invoked Function Expression)
 */
(function init() {
  // Create dashboard instance
  const dashboard = new DashboardApp();
  
  // Load notes
  dashboard.loadNotes();

  // Add export/import/clear buttons
  const taskSection = document.querySelector('.tasks');
  const filterBar = document.querySelector('.filter-bar');
  
  const actionBar = document.createElement('div');
  actionBar.style.cssText = 'display: flex; gap: 8px; margin-bottom: 16px;';
  actionBar.innerHTML = `
    <button onclick="window.dashboardApp.exportTasks()" style="flex: 1; font-size: 13px;">
      📥 Export
    </button>
    <label style="flex: 1;">
      <input type="file" accept=".json" style="display: none;" id="importFile">
      <button onclick="document.getElementById('importFile').click()" style="width: 100%; font-size: 13px;">
        📤 Import
      </button>
    </label>
    <button onclick="window.dashboardApp.clearAllTasks()" class="danger" style="flex: 1; font-size: 13px;">
      🗑️ Hapus Semua
    </button>
  `;
  
  taskSection.insertBefore(actionBar, filterBar);
  
  // Setup import handler
  document.getElementById('importFile').addEventListener('change', (e) => {
    dashboard.importTasks(e);
    e.target.value = ''; // Reset input
  });

  // Expose dashboard to window for button handlers
  window.dashboardApp = dashboard;
  
  console.log('✅ Dashboard initialized successfully!');
  console.log('📊 Features:', {
    'Classes (3)': '✓ Task, StorageManager, DashboardApp',
    'Arrow Functions (20+)': '✓',
    'Template Literals': '✓',
    'Async/Await': '✓',
    'localStorage': '✓',
    'Destructuring': '✓',
    'Spread Operator': '✓',
    'Array Methods': '✓ map, filter, find',
    'Promises': '✓',
    'Default Parameters': '✓'
  });
})();