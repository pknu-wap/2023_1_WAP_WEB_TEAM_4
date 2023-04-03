import React from "react";
import Header from "../components/Header";
import SideNavigation from "../components/SideNavigation";

function Main() {
  return (
    <div style={{ backgroundColor: "black", width: "100%", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "5000px",
        }}>
        <SideNavigation />
        <Header />
        <div
          style={{
            backgroundColor: "black",
            width: "900px",
            heiht: "40px",
            paddingLeft: "240px",
          }}>
          <div
            style={{
              color: "white",
              fontSize: "27px",
              padding: "120px 0px 20px 120px",
              fontWeight: "bold",
            }}>
            알고리즘에 대해 배워보자!
          </div>
          <div>
            <div
              style={{
                color: "white",
                fontSize: "23px",
                fontWeight: "bold",
                padding: " 20px 0px 0px 120px",
              }}>
              알고리즘
            </div>
            <div
              style={{
                color: "white",
                fontSize: "15px",
                padding: " 0px 0px 0px 120px",
              }}>
              알고리즘은 신기하다.
            </div>
            <div
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                padding: " 20px 0px 0px 120px",
              }}>
              알고리즘이 신기한 이유?
            </div>
            <div
              style={{
                color: "white",
                fontSize: "15px",
                padding: " 0px 0px 0px 120px",
              }}>
              모르겠다.
            </div>
            <div
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                padding: " 20px 0px 0px 120px",
              }}>
              알고리즘이 안신기해지려면?
            </div>
            <div
              style={{
                color: "white",
                fontSize: "15px",
                padding: " 0px 0px 0px 120px",
              }}>
              모르겠다.
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "black", width: "500px", heiht: "800px" }}>
          <div
            style={{
              margin: "250px 0px 0px 0px",
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
            <div style={{}}>
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
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Main;
