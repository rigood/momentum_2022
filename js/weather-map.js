// 현재 위치 찾기
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// 지도 관련 변수
let map;
let markers = [];
let customOverlays = [];
const mapContainer = document.getElementById("kakao-map");

let defaultPosition;
let currentPosition;

const LAT_SEOUL_NAMSAN_TOWER = 37.551216399999916;
const LON_SEOUL_NAMSAN_TOWER = 126.98406449999995;

// 지도 생성
function displayMap(position) {
  map = new kakao.maps.Map(mapContainer, {
    center: position,
    level: 6,
  });

  addMarker(position);
}

// 지도에 마커 표시
function addMarker(position) {
  const marker = new kakao.maps.Marker({ map, position });
  marker.setMap(map);
  markers.push(marker);
}

// 지도 초기화
function resetMap() {
  markers.forEach((marker) => {
    marker.setMap(null);
  });

  customOverlays.forEach((customOverlay) => {
    customOverlay.setMap(null);
  });

  markers = [];
  customOverlays = [];
}

// 장소 검색 개체 생성
const ps = new kakao.maps.services.Places();

// 장소 검색
const searchMapForm = document.getElementById("map-search-form");
const searchMapInput = searchMapForm.querySelector("input");

function handleKeyword(e) {
  e.preventDefault();

  const keyword = searchMapInput.value;

  if (keyword === "") {
    resetMap();
    displayMap(defaultPosition);
  }

  ps.keywordSearch(keyword, handleKeywordSearch);
}

searchMapForm.addEventListener("submit", handleKeyword);

// 장소 검색 콜백함수
function handleKeywordSearch(data, status, pagination) {
  // 검색 결과 있을 때
  if (status === kakao.maps.services.Status.OK) {
    resetMap();

    const bounds = new kakao.maps.LatLngBounds();

    data.forEach((place) => {
      displayPlaceSearch(place);
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
    });

    map.setBounds(bounds);
  }

  // 검색 결과 없을 때
  if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
    searchMapInput.value = "";

    resetMap();
    displayMap(defaultPosition);
  }

  // 오류 발생 시
  if (status === kakao.maps.services.Status.ERROR) {
    alert("오류가 발생했습니다");
  }
}

// 지도에 마커, 커스텀 오버레이 표시
function displayPlaceSearch(place) {
  const position = new kakao.maps.LatLng(place.y, place.x);

  // 마커 생성
  const marker = new kakao.maps.Marker({
    map,
    position,
  });
  markers.push(marker);

  // 커스텀 오버레이 생성
  const customOverlay = new kakao.maps.CustomOverlay({
    position,
    xAnchor: 0,
    yAnchor: 0,
    zIndex: 1,
    clickable: true,
  });

  let isCustomOverlayOpen = false;

  const container = document.createElement("div");
  container.className = "custom-overlay";

  const textContainer = document.createElement("div");
  textContainer.className = "text-container";

  const placeName = document.createElement("span");
  placeName.className = "place-name";
  placeName.innerText = place.place_name;

  const goToKakaoMap = document.createElement("a");
  goToKakaoMap.className = "goto-kakaomap";
  goToKakaoMap.href = `https://map.kakao.com/link/map/${place.id}`;
  goToKakaoMap.target = "_blank";
  goToKakaoMap.innerText = "자세히 보기";

  textContainer.append(placeName, goToKakaoMap);

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "✖";
  closeBtn.title = "닫기";
  closeBtn.onclick = () => {
    customOverlay.setMap(null);
    isCustomOverlayOpen = false;
  };

  container.append(textContainer, closeBtn);

  // 마커 클릭 시 커스텀 오버레이 열고 닫기
  kakao.maps.event.addListener(marker, "click", function () {
    if (isCustomOverlayOpen) {
      customOverlay.setMap(null);
      isCustomOverlayOpen = false;
    } else {
      customOverlay.setMap(map);
      isCustomOverlayOpen = true;
    }
  });

  customOverlay.setContent(container);

  customOverlays.push(customOverlay);
}

function onGeoError() {
  alert("날씨 정보를 가져올 수 없어요 😓");

  // 지도에 서울 남산타워 위치 표시
  defaultPosition = new kakao.maps.LatLng(
    LAT_SEOUL_NAMSAN_TOWER,
    LON_SEOUL_NAMSAN_TOWER
  );
  displayMap(defaultPosition);
}

function onGeoOk(position) {
  const myLat = position.coords.latitude;
  const myLon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=f3159283908f8d33a66e556ba1d370de&lang=kr&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // 오른쪽 상단 날씨 표시
      const weather = document.getElementById("weather");

      const city = document.createElement("span");
      city.innerText = data.name;

      const weatherIcon = document.createElement("img");
      weatherIcon.src = `./img/icons/${data.weather[0].icon}.png`;

      const temp = document.createElement("span");
      temp.innerText = Math.round(data.main.temp) + "°C";

      weather.append(city, weatherIcon, temp);

      // 지도에 내 위치 표시
      defaultPosition = new kakao.maps.LatLng(myLat, myLon);
      displayMap(defaultPosition);
    });
}
