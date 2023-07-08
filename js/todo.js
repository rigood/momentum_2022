const TODOS_KEY = "todos";
const savedToDos = localStorage.getItem(TODOS_KEY);

let toDos = [];
let draggingToDoId;
let afterToDoId;

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closestElement, element) => {
      const elementRect = element.getBoundingClientRect();
      const offset = y - elementRect.top - elementRect.height / 2;

      if (offset < 0 && offset > closestElement.offset) {
        return { offset, element };
      } else {
        return closestElement;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function handleDrop(e) {
  e.preventDefault();

  const draggingToDo = toDos.find((toDo) => toDo.id === draggingToDoId);

  const draggingToDoIndex = toDos.findIndex(
    (toDo) => toDo.id === draggingToDoId
  );

  toDos.splice(draggingToDoIndex, 1);

  const afterToDoIndex = afterToDoId
    ? toDos.findIndex((toDo) => toDo.id === afterToDoId)
    : toDos.length;

  toDos.splice(afterToDoIndex, 0, draggingToDo);

  saveToDos();
}

function handleDragOver(e) {
  e.preventDefault();
  const draggingElement = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(toDoList, e.clientY);

  toDoList.insertBefore(draggingElement, afterElement || null);

  draggingToDoId = draggingElement.id;
  afterToDoId = afterElement?.id;
}

function createTodo(e) {
  e.preventDefault();

  const newToDoObj = {
    id: String(Date.now()),
    text: toDoInput.value,
    checked: false,
  };

  paintToDo(newToDoObj);

  toDos.push(newToDoObj);
  saveToDos();

  toDoInput.value = "";
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(e) {
  const li = e.target.parentElement;
  li.remove();

  toDos = toDos.filter((toDo) => toDo.id !== li.id);
  saveToDos();
}

function toggleCheck(e) {
  e.preventDefault();

  const checkBtn = e.target;
  const li = e.target.parentElement;

  if (li.classList.contains("unchecked")) {
    li.classList.remove("unchecked");
    li.classList.add("checked");
    checkBtn.setAttribute("class", "check-btn far fa-square-check");
  } else {
    li.classList.remove("checked");
    li.classList.add("unchecked");
    checkBtn.setAttribute("class", "check-btn far fa-square");
  }

  toDos = toDos.map((toDo) =>
    toDo.id === li.id ? { ...toDo, checked: !toDo.checked } : toDo
  );

  saveToDos();
}

function paintToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  li.className = "draggable";
  li.classList.add(newToDo.checked ? "checked" : "unchecked");
  li.draggable = true;
  li.addEventListener("dragstart", () => li.classList.add("dragging"));
  li.addEventListener("dragend", () => li.classList.remove("dragging"));

  const checkBtn = document.createElement("i");
  checkBtn.setAttribute(
    "class",
    newToDo.checked
      ? "check-btn far fa-square-check"
      : "check-btn far fa-square"
  );

  const todoText = document.createElement("div");
  todoText.className = "todo-text";
  todoText.innerText = newToDo.text;

  const deleteBtn = document.createElement("i");
  deleteBtn.setAttribute("class", "fas fa-trash");

  checkBtn.addEventListener("click", toggleCheck);
  deleteBtn.addEventListener("click", deleteToDo);

  li.append(checkBtn, todoText, deleteBtn);

  toDoList.appendChild(li);
  toDoList.scrollTop = toDoList.scrollHeight;
}

toDoList.addEventListener("drop", handleDrop);
toDoList.addEventListener("dragover", handleDragOver);
toDoForm.addEventListener("submit", createTodo);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  toDos.forEach(paintToDo);
}
