import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/common/Footer";
import Home from "./components/Home";
import NotFound from "./components/common/NotFound";
import Fishing from "./components/fishing/Fishing";
import Login from "./components/account/Login";
import Dogam from "./components/dogam/Dogam";
import Signup from "./components/account/Signup";
import Fishpic from "./components/fishing/Fishpic";
import FavoriteSpots from "./components/map/FavoriteSpots";
import Board from "./components/board/Board";
import ModifyFeed from "./components/board/ModifyFeed";
import Getfish from "./components/camera/Getfish";
import CreateFeed from "./components/board/CreateFeed";

import Background from "./components/common/Background";
import Loading from "./components/common/Loading";
import Profile from "./components/user/Profile";
import SeaScene from "./components/fishbowl/SeaScene";
import ImgTest from "./temp/Teacherable/ImgTest";
import Map from "./components/map/Map";
// import Map2 from "./components/map/Map2";
import Inventory from "./components/fishbowl/Inventory";
// import Bowl from "./components/fishbowl/Bowl";
import Balls from "./components/fishbowl/Balls";
import Freshman from "./components/freshman/Freshman";
import Achievements from "./components/achievements/Achievements";
import Kakao from "./components/account/Kakao";
import Camera from "./components/camera/Camera";
import Dict from "./components/dict/Dict";

import UserUpdate from "./components/account/Userupdate";

import Checkbox from "./components/freshman/Checkbox";
import Newbie from "./components/freshman/Newbie";
import cv from "@techstark/opencv-js";
import { Tensor, InferenceSession } from "onnxruntime-web";
import { download } from "./components/camera/utils/download";
import { useRecoilState } from "recoil";
import { yolo_recoil, location_recoil, loginuser } from "./utils/atoms";

import Profileballs from "./components/fishbowl/Profileballs";
import Profilesea from "./components/fishbowl/Profilesea";

function AppRouter(props) {
  const [yolo, setYolo] = useRecoilState(yolo_recoil);
  const modelName = "best.onnx";
  const [loading, setLoading] = useState({
    text: "Loading OpenCV.js",
    progress: null,
    isStuck: false, // 새로고침 유도 상태 변수
  });
  const [location, setLocation] = useRecoilState(location_recoil);
  const [user, setuser] = useRecoilState(loginuser);
  const localloginuser = localStorage.getItem("loginuser");
  function updateLocation(latitude, longitude) {
    setLocation({ latitude, longitude });
    console.log("Received location:", latitude, longitude);
    // 리액트에서 현위치 정보 활용
  }

  useEffect(() => {
    if (yolo === undefined) {
      cv["onRuntimeInitialized"] = async () => {
        try {
          const baseModelURL = `${process.env.PUBLIC_URL}/model`;
          const modelInputShape = [1, 3, 640, 640];
          console.log(baseModelURL);

          // create session
          const arrBufNet = await download(
            `${baseModelURL}/${modelName}`, // url
            ["Loading YOLOv8 Segmentation model", setLoading] // logger
          );
          const yolov8 = await InferenceSession.create(arrBufNet);

          const arrBufNMS = await download(
            `${baseModelURL}/nms-yolov8.onnx`, // url
            ["Loading NMS model", setLoading] // logger
          );
          const nms = await InferenceSession.create(arrBufNMS);

          console.log(arrBufNet, yolov8, arrBufNMS, nms);

          // warmup main model
          // setLoading({ text: "Warming up model...", progress: null });
          const tensor = new Tensor(
            "float32",
            new Float32Array(modelInputShape.reduce((a, b) => a * b)),
            modelInputShape
          );
          await yolov8.run({ images: tensor });

          if (yolov8 && nms) {
            setLoading(null);
            setYolo({ net: yolov8, nms: nms });
            console.log(yolo);
            return;
            // setSession({ net: yolov8, nms: nms });
          } else {
            console.error("'yolov8' or 'nms' is null.");
          }
        } catch (error) {
          console.error("An error occurred:", error);
          // Handle the error as needed, e.g., show an error message to the user.
        }
      };
    }
  }, []);

  return (
    <div
      className="App"
      style={{
        margin: "auto",
        //   width: '80%',
      }}
    >
      <BrowserRouter>
        <Background />
        {/* <Header style={{
          margin:'auto',
         }}/> */}
        <Routes
          style={{
            margin: "auto",
          }}
        >
          <Route
            path="/"
            element={!localloginuser ? <Login /> : <Home />}
          ></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/fishing" element={<Fishing />}></Route>
          <Route path="/Fishpic" element={<Fishpic />}></Route>
          <Route path="/Dict" element={<Dict />}></Route>
          <Route path="/login/oauth2/code/kakao" element={<Kakao />}></Route>

          <Route path="/UserUpdate" element={<UserUpdate />}></Route>
          <Route path="/Balls" element={<Balls />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Dogam" element={<Dogam />}></Route>
          <Route path="/ImgTest" element={<ImgTest />}></Route>
          <Route path="/Inventory" element={<Inventory />}></Route>
          <Route path="/Loading" element={<Loading />}></Route>
          <Route path="/SeaScene" element={<SeaScene />}></Route>
          <Route path="/Board" element={<Board />}></Route>
          <Route path="/CreateFeed" element={<CreateFeed />}></Route>
          <Route path="/ModifyFeed/:postId" element={<ModifyFeed />}></Route>
          {/* <Route path="/SeaScene" element={<SeaScene />}></Route> */}
          <Route path="/Profile/:userId" element={<Profile />}></Route>
          <Route path="/Camera" element={<Camera />}></Route>
          {/* <Route path="/FishBowl" element={<FishBowl />}></Route> */}

          <Route path="/Map" element={<Map />}></Route>
          <Route path="/Getfish" element={<Getfish />}></Route>
          {/* <Route path="/Map2" element={<Map2 />}></Route> */}
          <Route path="/FavoriteSpots" element={<FavoriteSpots />}></Route>
          <Route path="/Checkbox" element={<Checkbox />}></Route>
          <Route path="/Newbie" element={<Newbie />}></Route>
          <Route path="/Freshman" element={<Freshman />}></Route>
          <Route path="/Achievements" element={<Achievements />}></Route>
          <Route path="/Profileballs" element={<Profileballs />}></Route>
          <Route path="/Profilesea" element={<Profilesea />}></Route>
          {/* <Route path="/Bowl" element={<Bowl />}></Route> */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
