const clock = document.querySelector("#clock");

function getClock() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const weekdayArray = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekday = weekdayArray[today.getDay()];

  let hour = today.getHours();
  const ampm = hour < 12 ? "AM" : "PM";
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour = hour - 12;
  }

  const minute = String(today.getMinutes()).padStart(2, "0");

  const date = `${year}-${month}-${day} ${weekday} ${hour}:${minute} ${ampm}`;

  clock.innerText = date;
}

getClock();
setInterval(getClock, 1000);
