/* geolocation 으로 현재 위치 찾기 */
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
const API_KEY = "f3159283908f8d33a66e556ba1d370de";

/* 지도 준비 */
const mapContainer = document.querySelector("#map");
const mapOption = {
  center: new kakao.maps.LatLng(37.566826, 126.9786567),
  level: 6,
};

/* 지도 생성 */
const map = new kakao.maps.Map(mapContainer, mapOption);
let currentPosition;

/* 지도 좌표 표시 함수 */
function displayMap(currentPosition) {
  const marker = new kakao.maps.Marker({
    map: map,
    position: currentPosition,
  });
  map.setCenter(currentPosition);
  marker.setMap(map);
}

/* geolocation 연결 여부에 따른 함수 실행 */
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`;
  fetch(url).then((response) =>
    response.json().then((data) => {
      // 오른쪽 상단 날씨 표시
      const weather = document.querySelector("#weather");
      const city = data.name;
      const temp = Math.round(data.main.temp);
      const weatherIconNum = data.weather[0].icon;
      const weatherIcon = document.createElement("img");
      weatherIcon.src = `./img/icons/${weatherIconNum}.png`;
      weather.append(city, weatherIcon, `${temp}°C`);
      // 왼쪽 하단 지도 표시 (현재 위치)
      currentPosition = new kakao.maps.LatLng(lat, lon);
      displayMap(currentPosition);
    })
  );
}

function onGeoError() {
  alert("날씨 정보를 가져올 수 없어요 ㅠㅠ");
  // 지도 표시 (서울 남산타워)
  currentPosition = new kakao.maps.LatLng(
    37.551216399999916,
    126.98406449999995
  );
  displayMap(currentPosition);
}

/* 장소 검색 개체 생성 */
const ps = new kakao.maps.services.Places();

/* 검색 키워드 가져오기 */
const searchMapForm = document.querySelector("#searchmap-form");

function handleKeyword(event) {
  event.preventDefault();
  const input = searchMapForm.querySelector("input");
  /* 키워드로 장소 검색 */
  // keywordSearch(keyword, callback, options)
  ps.keywordSearch(input.value, placeSearchCB);
}

searchMapForm.addEventListener("submit", handleKeyword);

/* 키워드 검색 완료 시 호출되는 콜백함수 */
function placeSearchCB(data, status, pagination) {
  // 검색결과 있음
  if (status === kakao.maps.services.Status.OK) {
    const bounds = new kakao.maps.LatLngBounds(); // LatLngBounds(sw, ne): 남서쪽 좌표, 북동쪽 좌표를 통해 사각영역 객체 생성
    for (i = 0; i < data.length; i++) {
      placeSearchDisplay(data[i]);
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x)); // 주어진 좌표를 포함하도록 영역 확장
    }
    map.setLevel(4);
    map.setBounds(bounds); // 검색된 장소 위치를 기준으로 지도 범위 재설정
  }
}

/* 지도에 마커, 인포윈도우, 확대축소 컨트롤 표시 */
function placeSearchDisplay(place) {
  // 마커 생성
  const marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  // 인포윈도우 생성
  const infowindow = new kakao.maps.InfoWindow({
    zIndex: 1,
    removable: true,
  });

  // 마커에 클릭이벤트 등록
  kakao.maps.event.addListener(marker, "click", function () {
    // 마커 클릭 시 인포윈도우에 장소명 표출
    infowindow.setContent(
      '<div style="padding:10px;font-size:12px;">' + place.place_name + "</div>"
    );
    infowindow.open(map, marker);
  });
}
