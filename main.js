import "./style.css";

const addButton = document.getElementById("add-button");
const ulList = document.querySelector("#ulList");
const liLists = document.querySelector("li");
const userInput = document.querySelector("#task-input");

function createNewList() {
  const newList = document.createElement("li");
  newList.innerHTML = userInput.value;

  ulList.appendChild(newList);
}

addButton.addEventListener("click", createNewList);

function taskIsDone() {
  for (let i = 0; i < liLists.length; i++) {
    const done = document.createElement("button");
    done.innerHTML = "Done";
    liLists.appendChild(done);
  }
}
liLists.addEventListener("click", taskIsDone);
