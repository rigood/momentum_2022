const clock = document.querySelector("#clock");

function getClock() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = today.getDate();
  const weekdayArray = new Array(7);
  weekdayArray[0] = "SUN";
  weekdayArray[1] = "MON";
  weekdayArray[2] = "TUE";
  weekdayArray[3] = "WED";
  weekdayArray[4] = "THU";
  weekdayArray[5] = "FRI";
  weekdayArray[6] = "SAT";
  const weekday = weekdayArray[today.getDay()];
  const hour = today.getHours();
  const minute = String(today.getMinutes()).padStart(2, "0");

  if (hour == 0) {
    clock.innerText = `${year}-${month}-${day} ${weekday} AM ${
      hour + 12
    }:${minute}`;
  } else if (hour > 0 && hour < 12) {
    clock.innerText = `${year}-${month}-${day} ${weekday} AM ${hour}:${minute}`;
  } else if (hour == 12) {
    clock.innerText = `${year}-${month}-${day} ${weekday} PM ${hour}:${minute}`;
  } else {
    clock.innerText = `${year}-${month}-${day} ${weekday} PM ${
      hour - 12
    }:${minute}`;
  }
}

getClock();
setInterval(getClock, 1000);
