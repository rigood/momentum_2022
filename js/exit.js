const exitBtn = document.querySelector("#exit");

function handleExit() {
  localStorage.clear();
  window.location.reload();
}
exitBtn.addEventListener("click", handleExit);
