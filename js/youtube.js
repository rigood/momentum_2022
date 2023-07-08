const YOUTUBE_KEY = "youtube";
const savedYoutubeId = localStorage.getItem(YOUTUBE_KEY);

const youtubeContainer = document.getElementById("youtube-iframe-wrapper");
const youtubeIframe = youtubeContainer.querySelector("iframe");
const youtubeUrlForm = document.getElementById("youtube-url-form");
const youtubeUrlInput = youtubeUrlForm.querySelector("input");

function changeYoutubeVideo(e) {
  e.preventDefault();
  const youtubeUrl = youtubeUrlInput.value;

  if (youtubeUrl === "") return;

  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

  const match = youtubeUrl.match(regExp);

  if (match && match[7].length === 11) {
    const youtubeId = match[7];
    displayYoutubeVideo(youtubeId);
    localStorage.setItem(YOUTUBE_KEY, youtubeId);
    youtubeUrlInput.value = "";
    youtubeUrlInput.blur();
  } else {
    alert("올바르지 않은 주소입니다. 다시 한번 확인해주세요.");
  }
}

function displayYoutubeVideo(youtubeId) {
  youtubeIframe.src = `https://www.youtube.com/embed/${youtubeId}`;
}

youtubeUrlForm.addEventListener("submit", changeYoutubeVideo);

if (savedYoutubeId) {
  displayYoutubeVideo(savedYoutubeId);
}
