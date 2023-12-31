import React, { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { RecoilRoot } from "recoil";

function App(props) {
  // 모바일 웹에서 올바른 영역을 잡기 위한 작업
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // 화면 크기 변경 감지
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  return (
    <RecoilRoot>
      <AppRouter />
    </RecoilRoot>
  );
}

export default App;
