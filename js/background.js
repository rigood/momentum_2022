const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34",
];

const bgColor = document.querySelector("#bg-colorBtn");
const bgCloud = document.querySelector("#bg-cloudBtn");

function changeBgColor() {
  const a = colors[Math.floor(Math.random() * colors.length)];
  const b = colors[Math.floor(Math.random() * colors.length)];
  if (a === b) {
    return handleClick();
  }
  bgColor.style.background = a;
  bgColor.style.color = "white";
  bgCloud.style.background = "white";
  bgCloud.style.color = "black";
  document.body.style.background = `linear-gradient(${a}, ${b})`;
}

function changeBgCloud() {
  bgColor.style.background = "white";
  bgColor.style.color = "black";
  bgCloud.style.background = "#1c7ab7";
  bgCloud.style.color = "white";
  document.body.style.background = "url('img/bg_cloud.jpg')";
  document.body.style.backgroundSize = "cover";
}

bgColor.addEventListener("click", changeBgColor);
bgCloud.addEventListener("click", changeBgCloud);
