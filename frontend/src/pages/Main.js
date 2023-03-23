import React from "react";

function Main() {
  return (
    <div
      style={{
        backgroundColor: "aqua",
        display: "flex",
        flexDirection: "row",
      }}>
      <div
        style={{
          backgroundColor: "black",
          // background-color: "white"
          width: "300px",
          height: "300px",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20%",
        }}>
        Main
      </div>
      <div style={{ width: "300px", height: "300px" }}></div>
    </div>
  );
}

export default Main;
