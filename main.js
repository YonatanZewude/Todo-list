import "./style.css";

class Task {
  taskName;
  isDone;

  constructor(taskName, isDone = false) {
    this.taskName = taskName;
    this.isDone = isDone;
  }

  changeDone() {
    this.isDone = !this.isDone;
  }
}
let tasks = [
  new Task("Handla", false),
  new Task("Tvätta bilen", false),
  new Task("Gymma", false),
  new Task("Städda", false),
];

localStorage.setItem("tasks", JSON.stringify(tasks));
const addButton = document.getElementById("add-button");
const ulList = document.querySelector("#ulList");
const userInput = document.querySelector("#task-input");

tasks.forEach((task) => {
  addTaskToList(task);
});

function addTaskToList(task) {
  const newList = document.createElement("li");
  newList.textContent = task.taskName;

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash-can";
  deleteIcon.id = "delete-icon";

  const done = document.createElement("button");
  done.className = "done-button";
  updateDoneButtonText(done, task);

  newList.appendChild(deleteIcon);
  newList.appendChild(done);
  ulList.appendChild(newList);

  done.addEventListener("click", function () {
    task.changeDone();
    changeDisplay(newList, task);
    updateDoneButtonText(done, task);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

function changeDisplay(taskElement, task) {
  if (task) {
    if (task.isDone) {
      taskElement.style.background = "#2a9d8f";
    } else {
      taskElement.style.background = "";
    }
  } else {
    if (taskElement.querySelector(".done-button.is-done")) {
      taskElement.style.background = "#2a9d8f";
    } else {
      taskElement.style.background = "";
    }
  }
}

function createNewList() {
  if (userInput.value === "") {
    alert("Ange en uppgift innan du lägger till");
    return;
  }

  const task = new Task(userInput.value);
  addTaskToList(task);
  userInput.value = "";
  changeDisplay(ulList.lastChild, task);
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addButton.addEventListener("click", createNewList);

function updateDoneButtonText(button, task) {
  if (task.isDone) {
    button.textContent = "Undone";
  } else {
    button.textContent = "Done";
  }
}

ulList.addEventListener("click", function (event) {
  if (event.target.id === "delete-icon") {
    const li = event.target.parentElement;
    ulList.removeChild(li);

    const indexToRemove = Array.from(ulList.children).indexOf(li);
    tasks.splice(indexToRemove, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

let isDragging = false;

let draggedElement = null;

ulList.addEventListener("mousedown", (e) => {
  if (e.target.tagName === "LI") {
    isDragging = true;
    draggedElement = e.target;
  }
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    ulList.insertBefore(
      draggedElement,
      getNextElement(e.clientY, draggedElement)
    );
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  draggedElement = null;
});

function getNextElement(y, _currentElement) {
  const elements = [...ulList.querySelectorAll("li:not(.dragging)")];
  return elements.reduce(
    (closest, element) => {
      const box = element.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
ulList.addEventListener("mousedown", (e) => {
  if (e.target.tagName === "LI") {
    isDragging = true;
    draggedElement = e.target;

    e.preventDefault();
  }
});
