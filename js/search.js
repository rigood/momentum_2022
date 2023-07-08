const googleSearchForm = document.getElementById("google-search-form");
const googleSearchInput = googleSearchForm.querySelector("input");

const naverSearchForm = document.getElementById("naver-search-form");
const naverSearchInput = naverSearchForm.querySelector("input");

function searchGoogle(e) {
  e.preventDefault();

  const keyword = googleSearchInput.value;

  window.open(`https://www.google.co.kr/search?q=${keyword}`);
  googleSearchInput.value = "";
  googleSearchInput.blur();
}

function searchNaver(e) {
  e.preventDefault();

  const keyword = naverSearchInput.value;

  window.open(`https://search.naver.com/search.naver?query=${keyword}`);
  naverSearchInput.value = "";
  naverSearchInput.blur();
}

googleSearchForm.addEventListener("submit", searchGoogle);
naverSearchForm.addEventListener("submit", searchNaver);
