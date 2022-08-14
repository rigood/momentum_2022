const HIDDEN_CLASSNAME = "hidden";

const photo = document.querySelector("#profile-photo");
const file = document.querySelector("#profile-file");

const nicknameForm = document.querySelector("#nickname-form");
const nicknameInput = document.querySelector("#nickname-input");
const nicknameDisplay = document.querySelector("#nickname-display");

const NICKNAME_KEY = "nickname";
const IMAGE_KEY = "image";

const savedNickname = localStorage.getItem(NICKNAME_KEY);
const savedImage = localStorage.getItem(IMAGE_KEY);
const defaultImageURL = "img/profile.jpg";

if (savedImage === null) {
  displayImage(defaultImageURL);
} else {
  displayImage(savedImage);
}

function displayImage(url) {
  photo.src = url;
}

file.addEventListener("change", function (event) {
  event.preventDefault();
  const chosenImage = this.files[0];
  if (chosenImage) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      photo.setAttribute("src", reader.result);
      localStorage.setItem(IMAGE_KEY, reader.result);
    });
    reader.readAsDataURL(chosenImage);
  }
});

if (savedNickname === null) {
  nicknameForm.classList.remove(HIDDEN_CLASSNAME);
  nicknameForm.addEventListener("submit", onNicknameSubmit);
} else {
  displayNickname(savedNickname);
}

function displayNickname(nickname) {
  nicknameDisplay.innerText = `${nickname} 님`;
  nicknameDisplay.classList.remove(HIDDEN_CLASSNAME);
}

function onNicknameSubmit(event) {
  event.preventDefault();
  nicknameForm.classList.add(HIDDEN_CLASSNAME);
  const nickname = nicknameInput.value;
  localStorage.setItem(NICKNAME_KEY, nickname);
  displayNickname(nickname);
}
