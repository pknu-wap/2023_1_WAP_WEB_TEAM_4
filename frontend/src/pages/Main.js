import React from "react";
import Header from "../components/Header";
import SideNavigation from "../components/SideNavigation";
import Post from "../components/Post";

function Main() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
        }}>
        <SideNavigation />
        <Header />
        <Post />
        <div
          style={{
            backgroundColor: "black",
            width: "300px",
            marginTop: "20%",
            height: "100%",
            position: "fixed",
            right: 0,
          }}>
          <div
            style={{
              height: "120px",
              borderLeft: "1px solid white",
            }}>
            <div
              style={{
                fontSize: "18px",
                color: "white",
                width: "400px",
                padding: "0px 0px 0px 15px",
              }}>
              ● 알고리즘
            </div>
            <div
              style={{
                color: "#ECD8A4",
                fontSize: "16px",
                padding: "10px 0px 0px 30px",
              }}>
              - 알고리즘이 신기한 이유?
            </div>
            <div
              style={{
                color: "white",
                fontSize: "16px",
                padding: "10px 0px 0px 30px",
              }}>
              - 알고리즘이 안신기해지려면?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
