document.addEventListener('DOMContentLoaded', function() {
    // DOM element selection
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || "[]");
        storedTasks.forEach(taskText => {
            createTaskElement(taskText, false); // false = don't save to Local Storage
        });
    }

    // Function to create a task element (separated for reuse)
    function createTaskElement(taskText, saveToStorage = true) {
        // Create new task item
        const listItem = document.createElement('li');
        
        // Create task text element
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        // Remove functionality
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            // Remove from Local Storage
            updateLocalStorage(taskText, 'remove');
        };
        
        // Assemble components
        listItem.appendChild(taskTextElement);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        
        // Save to Local Storage if needed
        if (saveToStorage) {
            updateLocalStorage(taskText, 'add');
        }
    }

    // Function to update Local Storage
    function updateLocalStorage(taskText, action) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        if (action === 'add') {
            storedTasks.push(taskText);
        } else if (action === 'remove') {
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
            }
        }
        
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Main add task function
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (!taskText) {
            alert('Please enter a valid task');
            return;
        }

        createTaskElement(taskText);
        taskInput.value = '';
    }

    // Event Listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});