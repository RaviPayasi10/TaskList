
// Define UI variables 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all Event Listeners
loadAllEventListeners();

// Load all Event Listeners
function loadAllEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event 
    form.addEventListener('submit', addTask);

    // Remove task
    taskList.addEventListener('click', removeTask);

    // Clear task
    clearBtn.addEventListener('click', clearTask);

    // Filter task event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add a class to it
        li.className = 'collection-item';

        // Create text node and append to li
        const textNode = document.createTextNode(task);
        li.appendChild(textNode);

        // Create new link element
        const link = document.createElement('a');
        // Add class to it
        link.className = 'delete-item secondary-content';
        // Add icon html
        // link.innerHTML = '<i class="fa fa-remove"></i>';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // console.log(link);
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(event) {
    if (taskInput.value === '') {
        alert('Add a Task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add a class to it
    li.className = 'collection-item';

    // Create text node and append to li
    const textNode = document.createTextNode(taskInput.value);
    li.appendChild(textNode);

    // Create new link element
    const link = document.createElement('a');
    // Add class to it
    link.className = 'delete-item secondary-content';
    // Add icon html
    // link.innerHTML = '<i class="fa fa-remove"></i>';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // console.log(link);
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input
    taskInput.value = '';

    event.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task - Checked
// function removeTask(event) {
//     if (event.target.parentElement.classList.contains('delete-item')) {
//         if (confirm('Are you sure ?')) {
//             event.target.parentElement.parentElement.remove();

//             // Remove from Local Storage
//             removeTaskFromLS(event.target.parentElement.parentElement);
//         }
//     }
// }

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();
  
        // Remove from LS
        removeTaskFromLS(e.target.parentElement.parentElement);
      }
    }
  }

//////////////////////////////////////////////////////////////

// Remove from LS - Checked
// function removeTaskFromLS(taskItem){
//     let tasks;
//     if(localStorage.getItem('tasks') === null){
//         tasks = [];
//     }else{
//         tasks = JSON.parse(localStorage.getItem('tasks'));
//     }

//     tasks.forEach(function (task, index){
//         if(taskItem.textContent === task){
//             tasks.splice(index,1);
//         }
//     });

//     localStorage.setItem('tasks',JSON.stringify(tasks));
// }

function removeTaskFromLS(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/////////////////////////////////////////////////////////////////////

// Clear Task
function clearTask() {
    // 1st Method - Slower
    // taskList.innerHTML = '';

    // 2nd Method - Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter tasks
function filterTasks(event) {
    const text = event.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}