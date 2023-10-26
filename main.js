import { addTaskToList, createNewList } from "./functions";
import { sortTasks } from "./sort";
import "./style.css";

export class Task {
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

export let tasks = [
  new Task("Handla", false),
  new Task("Tvätta bilen", false),
  new Task("Gymma", false),
  new Task("Städda", false),
];

localStorage.setItem("tasks", JSON.stringify(tasks));
const addButton = document.getElementById("add-button");
const ulList = document.querySelector("#ulList");
export const userInput = document.querySelector("#task-input");

tasks.forEach((task) => {
  addTaskToList(task);
});

addButton.addEventListener("click", createNewList);

ulList.addEventListener("click", function (event) {
  if (event.target.id === "delete-icon") {
    const li = event.target.parentElement;
    ulList.removeChild(li);

    const indexToRemove = Array.from(ulList.children).indexOf(li);
    tasks.splice(indexToRemove, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

sortTasks();
