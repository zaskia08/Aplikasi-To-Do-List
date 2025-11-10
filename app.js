let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');

renderTasks(tasks);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === '') return;

  const now = new Date();
  const date = now.toLocaleString('id-ID', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  tasks.push({ text, date });
  saveTasks();
  input.value = '';
  renderTasks(tasks);
});

function renderTasks(data) {
  taskList.innerHTML = '';

  data.forEach((task, index) => {
    const li = document.createElement('li');

    const textDiv = document.createElement('div');
    textDiv.className = 'task-text';
    textDiv.innerHTML = `<strong>${task.text}</strong><span class="date">${task.date}</span>`;

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Hapus';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteTask(index);

    btnGroup.append(editBtn, deleteBtn);
    li.append(textDiv, btnGroup);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks(tasks);
}

function editTask(index) {
  const newText = prompt('Edit tugas:', tasks[index].text);
  if (newText === null) return;
  const trimmed = newText.trim();
  if (trimmed === '') return alert('Teks tidak boleh kosong!');
  tasks[index].text = trimmed;
  saveTasks();
  renderTasks(tasks);
}

searchBtn.addEventListener('click', () => {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = tasks.filter(task => task.text.toLowerCase().includes(keyword));
  renderTasks(filtered);
});

resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  renderTasks(tasks);
});
