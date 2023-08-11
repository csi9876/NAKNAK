import React, { useState, useEffect } from "react";

import { authorizedRequest } from "../account/AxiosInterceptor";

import ItemSlide from "./ItemSlide";

import "./Inventory.css";

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inventoryData, setInventoryData] = useState({});
  const [fishBowlData, setFishBowlData] = useState({});
  const [itemData, setItemData] = useState(0);

  useEffect(() => {
    getInventory();
    getFishBowl();
  }, []);

  const itemchange = () => {
    setItemData(itemData + 1);
    console.log(itemData);
    getFishBowl();
    getInventory();
  };

  const getInventory = async () => {
    try {
      setLoading(true);

      const response = await authorizedRequest({
        method: "get",
        url: `api1/api/fishes/inventory/view`,
      });

      console.log("response success", response.data.data);
      setInventoryData(response.data.data);
      // console.log("inven data =", inventoryData[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory");
      setError("데이터 로드에 실패했습니다.");
      setLoading(false);
    }
  };

  const getFishBowl = async () => {
    try {
      const response = await authorizedRequest({
        method: "get",
        url: "/api1/api/fishes/fishbowl/view",
      });
      setFishBowlData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const goBack = () => {
    if (window && window.history && typeof window.history.back === "function") {
      window.history.back();
    }
  };

  const handleDeleteSlide = async (deletedFishInfo) => {
    console.log("deletefishinfo", deletedFishInfo.inventoryId);
    try {
      const response = await authorizedRequest({
        method: "post",
        url: `api1/api/fishes/inventory/delete`,
        data: {
          inventoryId: deletedFishInfo.inventoryId,
        },
      });
      setInventoryData((prevData) =>
        prevData.filter((fish) => fish !== deletedFishInfo)
      );
    } catch (error) {
      console.error("삭제 실패");
      return 0;
    }
    return 1;
  };

  ////////////////////add dummy data (inven)//////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  const addItem = async () => {
    try {
      setLoading(true);
      const fish = {
        fishCode: "A003",
        size: 41.3,
      };

      const response = await authorizedRequest({
        method: "post",
        url: `api1/api/fishes/catch`,
        data: fish,
      });

      console.log("response success", response.data);
      setInventoryData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory");
      setError("데이터 로드에 실패했습니다.");
      setLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  return (
    <div className="inven-wrapper">
      <img
        src="/assets/icons/x.png"
        alt="exit"
        className="dogam-back-button"
        onClick={goBack}
      />
      {/* // add dummy data code */}
      <img
        src="/assets/icons/x.png"
        alt="exit"
        // className="dogam-back-button"
        onClick={addItem}
      />
      <div className="inven-board">
        <div className="inven-carousel inven-disable-scrollbar">
          {Object.keys(inventoryData).map((key) => {
            const fish = inventoryData[key];
            return (
              <ItemSlide
                key={`inven${fish.inventoryId}`}
                fishInfo={fish}
                isFishBowl="false"
                onDeleteSlide={() => handleDeleteSlide(inventoryData[key])}
                itemchange={itemchange}
              />
            );
          })}
          {/* dummy start */}

          {/* dummy end */}
        </div>
        <div className="inven-carousel inven-disable-scrollbar">
          {Object.keys(fishBowlData).map((key) => {
            const fish = fishBowlData[key];
            return (
              <ItemSlide
                key={`fishbowl${fish.fishBowlId}`}
                fishInfo={fish}
                isFishBowl="true"
                onDeleteSlide={() => handleDeleteSlide(fishBowlData[key])}
                itemchange={itemchange}
              />
            );
          })}
          {/* dummy start */}
          {/* <p>{itemData}</p> */}
          {/* dummy end */}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
