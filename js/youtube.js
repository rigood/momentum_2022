const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-form input");

const youtubePlayer = document.querySelector("#youtube-player");
const youtubeIframePlayer = document.querySelector("#player");

function onSubmitClick(event) {
  event.preventDefault();
  const keyword = searchInput.value;
  const API_KEY = "AIzaSyALi0Ic6PitCkOV0-eDdrGl3wUoIJr02o0";
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${keyword}&type=video&key=${API_KEY}`;
  fetch(url).then((response) =>
    response.json().then((data) => {
      const keywordVideoId = data.items[0].id.videoId;
      onYouTubeIframeAPIReady(keywordVideoId);
      function onYouTubeIframeAPIReady(keywordVideoId) {
        const player = new YT.Player("player", {
          height: "281",
          width: "500",
          videoId: keywordVideoId,
        });
      }
    })
  );
  searchInput.value = "";
}

searchForm.addEventListener("submit", onSubmitClick);
