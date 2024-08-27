document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    loadTasks();

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            addedAt: new Date().toLocaleString()
        };

        tasks.push(task);
        saveTasks();
        loadTasks();

        taskInput.value = '';
    }

    function loadTasks() {
        pendingTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text} <small>(${task.addedAt})</small></span>
                <div>
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(task.id));
            li.querySelector('.edit-btn').addEventListener('click', () => editTask(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

            if (task.completed) {
                li.classList.add('completed');
                completedTasksList.appendChild(li);
            } else {
                pendingTasksList.appendChild(li);
            }
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function toggleComplete(id) {
        tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
        saveTasks();
        loadTasks();
    }

    function editTask(id) {
        const task = tasks.find(task => task.id === id);
        const newTaskText = prompt('Edit Task:', task.text);

        if (newTaskText !== null && newTaskText.trim() !== '') {
            task.text = newTaskText.trim();
            task.addedAt = new Date().toLocaleString(); 
            saveTasks();
            loadTasks();
        }
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        loadTasks();
    }
});
