const exitBtn = document.getElementById("exit-btn");

function resetLocalStorage() {
  const willLogout = confirm(
    "로그아웃 하시겠습니까?\n프로필 사진, 닉네임, 유튜브 영상, 할일 목록이 삭제됩니다."
  );

  if (!willLogout) return;

  localStorage.clear();
  window.location.reload();
}

exitBtn.addEventListener("click", resetLocalStorage);
