import { ulList } from "./main";

ulList.addEventListener(
  "click",
  function (event) {
    if (event.target.id === "delete-icon") {
      const li = event.target.parentElement;
      ulList.removeChild(li);
    }
  },

  function firstFourTasks() {
    const firstFourTasks = document.querySelectorAll(".done-button.first-four");

    for (let i = 0; i < firstFourTasks.length; i++) {
      const doneButton = firstFourTasks[i];

      doneButton.addEventListener("click", function () {
        doneButton.classList.toggle("is-done");

        if (doneButton.classList.contains("is-done")) {
          doneButton.textContent = "Undone";
          firstFourTasks[i].parentElement.style.background = "#2a9d8f";
        } else {
          doneButton.textContent = "Done";
          firstFourTasks[i].parentElement.style.background = "";
        }
      });
    }
  },

  let,
  (isDragging = false)
);
