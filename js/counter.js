const counterForm = document.querySelector("#counter-form");

function handleCounter(event) {
  event.preventDefault();
  const input = document.querySelector("#counter-input");
}

counterForm.addEventListener("submit", handleCounter);
