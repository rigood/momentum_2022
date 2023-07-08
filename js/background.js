const colorPalettes = [
  ["#70e1f5", "#ffd194"],
  ["#FFDEE9", "#B5FFFC"],
  ["#2BC0E4", "#EAECC6"],
  ["#74EBD5", "#9FACE6"],
  ["#F8CDDA", "#1D2B64"],
  ["#E5E5BE", "#003973"],
  ["#ff6e7f", "#bfe9ff"],
];

const BACKGROUND_KEY = "background";

const savedBgColors = localStorage.getItem(BACKGROUND_KEY);
const parsedBgColors = savedBgColors && JSON.parse(savedBgColors);
let currentBgStartColor = parsedBgColors && parsedBgColors[0];

const randomBgBtn = document.getElementById("random-bg-btn");
const cloudBgBtn = document.getElementById("cloud-bg-btn");

function generateBgColors() {
  return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
}

function setGradientBackground(color1, color2) {
  document.body.style.background = `linear-gradient(${color1}, ${color2})`;
}

function setRandomBackground() {
  let newBgColors = generateBgColors();

  while (currentBgStartColor === newBgColors[0]) {
    newBgColors = generateBgColors();
  }

  setGradientBackground(newBgColors[0], newBgColors[1]);
  currentBgStartColor = newBgColors[0];

  localStorage.setItem(BACKGROUND_KEY, JSON.stringify(newBgColors));
}

function setCloudBackground() {
  document.body.style.background = "url('img/background.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";

  localStorage.setItem(BACKGROUND_KEY, "");
}

randomBgBtn.addEventListener("click", setRandomBackground);
cloudBgBtn.addEventListener("click", setCloudBackground);

if (parsedBgColors) {
  setGradientBackground(parsedBgColors[0], parsedBgColors[1]);
}
