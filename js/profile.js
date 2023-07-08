const HIDDEN_CLASSNAME = "hidden";
const DEFAULT_PHOTO_URL = "img/profile.png";

const PHOTO_KEY = "photo";
const NICKNAME_KEY = "nickname";

const savedPhoto = localStorage.getItem(PHOTO_KEY);
const savedNickname = localStorage.getItem(NICKNAME_KEY);

const photoInput = document.getElementById("profile-photo-input");
const photoThumbnail = document.getElementById("profile-photo-thumbnail");

const nicknameForm = document.getElementById("profile-nickname-form");
const nicknameInput = nicknameForm.querySelector("input");
const nicknameDisplay = document.getElementById("profile-nickname-display");

function setNickname(e) {
  e.preventDefault();

  const nickname = nicknameInput.value;

  nicknameForm.classList.add(HIDDEN_CLASSNAME);
  displayNickname(nickname);

  localStorage.setItem(NICKNAME_KEY, nickname);
}

function checkNicknameMaxLength(e) {
  if (e.target.value.length > 10) {
    alert("닉네임은 최대 10자까지 입력 가능합니다!");
  }
}

function setProfileThumbnail(e) {
  e.preventDefault();

  const img = e.target.files[0];
  if (!img) return;

  const reader = new FileReader();

  reader.addEventListener("load", function () {
    photoThumbnail.setAttribute("src", reader.result);
    localStorage.setItem(PHOTO_KEY, reader.result);
  });

  reader.readAsDataURL(img);
}

function displayNickname(nickname) {
  nicknameDisplay.classList.remove(HIDDEN_CLASSNAME);
  nicknameDisplay.innerText = `${nickname} 님`;
}

function displayPhoto(photoUrl) {
  photoThumbnail.src = photoUrl;
}

nicknameForm.addEventListener("submit", setNickname);
nicknameInput.addEventListener("keyup", checkNicknameMaxLength);
photoInput.addEventListener("change", setProfileThumbnail);

if (savedNickname) {
  nicknameForm.classList.add(HIDDEN_CLASSNAME);
  displayNickname(savedNickname);
}

if (savedPhoto) {
  displayPhoto(savedPhoto);
}
