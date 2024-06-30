document.addEventListener('DOMContentLoaded', () => {
    const unfinishedTasks = document.getElementById('unfinished-tasks');
    const finishedTasks = document.getElementById('finished-tasks');
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const darkModeBtn = document.getElementById('dark-mode-btn');

    function loadTasks() {
        const unfinished = JSON.parse(localStorage.getItem('unfinishedTasks')) || [];
        const finished = JSON.parse(localStorage.getItem('finishedTasks')) || [];

        unfinished.forEach(task => addTaskToDOM(task, false));
        finished.forEach(task => addTaskToDOM(task, true));
    }

    function addTaskToDOM(task, isFinished) {
        const taskItem = document.createElement('li');
        
        if (isFinished) {
            taskItem.innerHTML = `<span>${task}</span> <span class="icon">✔️</span>`;
        } else {
            taskItem.innerHTML = `<input type="checkbox"> <span>${task}</span>`;
        }

        taskItem.addEventListener('click', () => {
            taskItem.remove();
            if (isFinished) {
                addTaskToDOM(task, false);
                saveTask(task, false);
            } else {
                addTaskToDOM(task, true);
                saveTask(task, true);
            }
        });

        if (isFinished) {
            finishedTasks.appendChild(taskItem);
        } else {
            unfinishedTasks.appendChild(taskItem);
        }
    }

    function saveTask(task, isFinished) {
        const unfinished = JSON.parse(localStorage.getItem('unfinishedTasks')) || [];
        const finished = JSON.parse(localStorage.getItem('finishedTasks')) || [];

        if (isFinished) {
            localStorage.setItem('unfinishedTasks', JSON.stringify(unfinished.filter(t => t !== task)));
            finished.push(task);
            localStorage.setItem('finishedTasks', JSON.stringify(finished));
        } else {
            localStorage.setItem('finishedTasks', JSON.stringify(finished.filter(t => t !== task)));
            unfinished.push(task);
            localStorage.setItem('unfinishedTasks', JSON.stringify(unfinished));
        }
    }

    addTaskBtn.addEventListener('click', () => {
        const task = newTaskInput.value.trim();
        if (task) {
            addTaskToDOM(task, false);
            saveTask(task, false);
            newTaskInput.value = '';
        }
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeBtn.textContent = '🌙';
        } else {
            darkModeBtn.textContent = '☀️';
        }
    });
    loadTasks();
});