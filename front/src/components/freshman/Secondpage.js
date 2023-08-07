import { React, useEffect, useState } from "react";
import Wave from "react-wavify";
import "./Secondpage.css";
import Lure from "./Lure";
import Onetwo from "./Onetwo";

function Secondpage({ show }) {
  const [fishingType, setFishingType] = useState("Lure");

  useEffect(() => {
    if (show === "Lure") {
      setFishingType("Lure");
    } else {
      setFishingType("OneTwo");
    }
  }, []);
  const [step, setStep] = useState(0);

  const nextTalk = () => {
    setStep(step + 1);
  };
  const beforeTalk = () => {
    setStep(step - 1);
  };

  return (
    <div className="second_wrapper">
      <div className="second_talk">
        {/* <span className="second_img"></span> */}
        {fishingType === "Lure" && (
          <span className="second_title">
            <img src={Lure[step]?.image} alt="" />
            {Lure[step].content}
          </span>
        )}
        {fishingType === "OneTwo" && (
          <span className="second_title">
            <img src={Onetwo[step]?.image} alt="" />
            {Onetwo[step].content}
          </span>
        )}
        {step > 0 && (
          <span className="btn1" onClick={() => beforeTalk()}>
            &lt; 이전
          </span>
        )}
        {step < (fishingType === "Lure" ? Lure : Onetwo).length - 1 && (
          <span className="btn2" onClick={() => nextTalk()}>
            다음 &gt;
          </span>
        )}
      </div>
      <div className="second_cat_img"></div>
      {/* 가장 가까운 파도 */}
      <Wave
        className="second_wave2"
        fill="#6ec1df"
        paused={false}
        style={{ display: "flex" }}
        options={{
          height: 45,
          amplitude: 20,
          speed: 0.32,
          points: 3,
        }}
      />
      {/*중간 파도  */}
      <Wave
        className="second_wave1"
        fill="#408BD0"
        paused={false}
        // style={{ display: "flex" }}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.38,
          points: 4,
        }}
      ></Wave>
      {/* 마지막파도 */}
      <Wave
        className="second_wave3"
        fill="#82E7ED"
        paused={false}
        style={{ display: "flex" }}
        options={{
          height: 35,
          amplitude: 20,
          speed: 0.5,
          points: 4,
        }}
      />
    </div>
    // </div>
  );
}

export default Secondpage;