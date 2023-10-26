import { getNextElement } from "./functions";

export function sortTasks() {
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

  ulList.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "LI") {
      isDragging = true;
      draggedElement = e.target;

      e.preventDefault();
    }
  });
}
