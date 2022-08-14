const exitBtn = document.querySelector("#exit");

function handleExit() {
  if (
    confirm(
      "로그아웃 하시겠습니까?\n저장된 프로필 사진, 닉네임, 할일 목록이 삭제됩니다."
    )
  ) {
    localStorage.clear();
    window.location.reload();
  } else {
    return;
  }
}
exitBtn.addEventListener("click", handleExit);
