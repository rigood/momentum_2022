const googleForm = document.querySelector("#google-form");
let keyword;

function handleGoogle(event) {
  event.preventDefault();
  const input = googleForm.querySelector("input");
  keyword = input.value;
  window.open(`https://www.google.co.kr/search?q=${keyword}`);
  input.value = "";
}

googleForm.addEventListener("submit", handleGoogle);
