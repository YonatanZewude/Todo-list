import { Task, tasks, userInput } from "./main";

export function createNewList() {
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

export function addTaskToList(task) {
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

    const taskToUpdate = tasks.find((t) => t.taskName === task.taskName);
    if (taskToUpdate) {
      taskToUpdate.isDone = task.isDone;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
}

function changeDisplay(taskElement, task) {
  if (task) {
    if (task.isDone) {
      taskElement.style.background = "#F1948A";
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

function updateDoneButtonText(button, task) {
  if (task.isDone) {
    button.textContent = "Undone";
  } else {
    button.textContent = "Done";
  }
}

export function getNextElement(y, _currentElement) {
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
