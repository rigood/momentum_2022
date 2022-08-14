const ddayForm = document.querySelector("#d-day-form");

const DDAY_KEY = "d-day";

function calcDday(event) {
  event.preventDefault();
  const input = document.querySelector("d-day-input");
  const dday = input.value;
  localStorage.setItem(DDAY_KEY, dday);
}

ddayForm.addEventListener("submit", calcdday);
