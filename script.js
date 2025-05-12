// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from LocalStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task Function
addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  // Create new task item
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Add to list
  taskList.appendChild(li);

  // Save to LocalStorage
  saveTaskToLocalStorage(taskText);

  // Clear input
  taskInput.value = "";

  // Add event listeners for delete and complete
  li.querySelector(".delete-btn").addEventListener("click", deleteTask);
  li.addEventListener("click", toggleComplete);
}

// Delete Task Function
function deleteTask(e) {
  const li = e.target.parentElement;
  const taskText = li.querySelector("span").textContent;

  // Remove from DOM
  li.remove();

  // Remove from LocalStorage
  removeTaskFromLocalStorage(taskText);
}

// Toggle Complete Function
function toggleComplete(e) {
  if (e.target.tagName === "BUTTON") return; // Ignore delete button
  const li = e.currentTarget;
  li.classList.toggle("completed");
}

// LocalStorage Functions
function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task}</span>
      <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);

    // Add event listeners
    li.querySelector(".delete-btn").addEventListener("click", deleteTask);
    li.addEventListener("click", toggleComplete);
  });
}
