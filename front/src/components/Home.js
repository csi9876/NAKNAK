import React from "react";
import "./Home.css"; // Home.css 파일을 import 합니다.

function Home(props) {
  return (
    <div className="home-container">
      <div className="home-image-container">
        <img src="assets/images/mainballoon.png" alt="mainimg import error" />
      </div>
    </div>
  );
}

export default Home;