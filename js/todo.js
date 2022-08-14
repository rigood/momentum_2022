const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = [];
const TODOS_KEY = "todos";

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function handleCheck(event) {
  event.preventDefault();
  const lineText = event.target.parentElement.querySelector("span");
  if (event.target.id == "unchecked") {
    event.target.setAttribute("class", "fi fi-sr-checkbox");
    lineText.style.textDecoration = "line-through";
    lineText.style.color = "#888888";
    event.target.style.color = "#888888";
    event.target.id = "checked";
  } else {
    event.target.setAttribute("class", "fi fi-sr-square");
    lineText.style.textDecoration = "none";
    lineText.style.color = "#333333";
    event.target.style.color = "#333333";
    event.target.id = "unchecked";
  }
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;

  const checkBtn = document.createElement("i");
  checkBtn.setAttribute("class", "fi fi-sr-square");
  checkBtn.setAttribute("id", "unchecked");
  const todoSpan = document.createElement("span");
  todoSpan.innerText = newToDo.text;
  const deleteBtn = document.createElement("i");
  deleteBtn.setAttribute("class", "fi fi-rr-cross-small");

  checkBtn.addEventListener("click", handleCheck);
  deleteBtn.addEventListener("click", deleteToDo);

  li.appendChild(checkBtn);
  li.appendChild(todoSpan);
  li.appendChild(deleteBtn);
  toDoList.appendChild(li);

  toDoList.scrollTop = toDoList.scrollHeight;
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
