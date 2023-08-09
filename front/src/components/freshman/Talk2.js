// import { getLocation } from "../map/getLocation";
import React from "react";
import fishingSpots from "../map/fishingSpots";

// 가까운 낚시터 찾는 함수
const getLocation = () => {
  let Lat = 35.095651;
  let Lng = 128.854831;

  let location = {
    distance: 10,
    title: "",
    lat: 0,
    lng: 0,
  };
  for (let i = 0; i < fishingSpots.length; i++) {
    const cal_lat = Math.abs(fishingSpots[i].lat - Lat);
    const cal_lng = Math.abs(fishingSpots[i].lng - Lng);

    const distance = cal_lat * cal_lat + cal_lng * cal_lng;
    if (distance < location.distance) {
      location.distance = distance;
      location.title = fishingSpots[i].title;
      location.lat = fishingSpots[i].lat;
      location.lng = fishingSpots[i].lng;
    }
  }
  return location;
};

const Talk2 = [
  {
    id: 0,
    content: "자, 이제 여기 지도 버튼을 클릭해볼까?",
  },
  {
    id: 1,

    content: (
      <span className="map-newbie-talk">
        현재 네가 있는 여기에서, 갈만한 낚시 장소를 찾아보자. 음.. 내가 보기엔{" "}
        <span className="location">{getLocation().title}</span>가 제일 좋을 것
        같아!
      </span>
    ),
    spot_lng: `${getLocation().lng}`,
    spot_lat: `${getLocation().lat}`,
  },
  {
    id: 2,

    content: "자 마커를 한번 클릭해볼래?",
  },
  {
    id: 3,

    content: "여기서 낚시에 필요한 정보들을 볼 수 있어.",
  },
  {
    id: 4,
    content: "자 이제 홈화면으로 가볼게.",
  },
  {
    id: 5,
    content: "카메라를 한 번 눌려봐!",
  },
  {
    id: 6,
    content:
      "라이터와 물고기를 수평으로 놓고 사진을 찍으면 자동으로 물고기 크기를 측정할 수 있어.",
  },
  {
    id: 7,
    content: "그리고 이게 너의 도감에 들어가서 나중엔 어장에서 확인도 가능해!",
  },
  {
    id: 8,
    content:
      "자. 이제 해야할 일들은 끝이 났어. 마지막으로 준비물을 체크할 수 있는 체크리스트를 소개해줄게.",
  },
  {
    id: 9,
    content:
      "처음에는 준비물이 많고, 익혀야 할 일들이 많으니까 이 체크리스트를 활용하도록 해! 메인화면에서 확인할 수 있어.",
  },
];

export default Talk2;