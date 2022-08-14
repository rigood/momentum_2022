const cookieMsg = [
  "오늘은 기분 좋게 웃으며 하루를 시작하세요!",
  "자존심이 세 보이지만 마음이 여린 당신은 돌봐줄 사람이 필요해요.",
  "뜻밖의 행운이 올 것 같은 날입니다.",
  "애정운이 좋은 시기입니다. 그 사람에게 적극적으로 다가가 보세요.",
  "너무 많은 말을 하는 것은 너무 적은 것보다 좋지 않습니다.",
  "때로는 약간의 고집이 필요합니다.",
  "오늘은 무엇을 하든지 잘 될 거예요. 미루지 말고 시작해보세요",
  "가까운 사이일수록 예의가 필요합니다. 상처받기 쉬우니까요.",
  "당신에게 필요한 것은 적절한 시기를 기다릴 줄 아는 여유입니다.",
  "건강주의보! 연이은 과로를 조심하세요.",
  "친구, 가족에게 작은 선물을 해보세요. 행복해질거예요.",
  "특별한 일도 없는데 자꾸 말을 거는 그 사람은 당신에게 관심이 있군요.",
  "당분간 지켜보는 것이 좋습니다. 타이밍이 중요합니다.",
  "지금의 나를 인정하고 사랑해주세요.",
  "괜찮아요. 우리에게는 내일이 있잖아요. 파이팅!",
];
const fortune = document.querySelector("#fortune");
const openMsg = document.querySelector("#openMsg");

function showMsg(event) {
  event.preventDefault();
  openMsg.innerHTML = cookieMsg[Math.floor(Math.random() * cookieMsg.length)];
}

fortune.addEventListener("click", showMsg);
