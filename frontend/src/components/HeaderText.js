import React from "react";

function HeaderText() {
  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
      <div style={{ width: "10%", height: "100%", backgroundColor: "yellow" }}>
        <div>SUNGWOO'S BLOG</div>
      </div>

      <div
        style={{
          width: "20%",
          height: "100%",
          backgroundColor: "blue",
          display: "flex",
          flexDirection: "row",
        }}>
        <div
          style={{ width: "50%", height: "100%", backgroundColor: "green" }}
        />

        <div style={{ width: "50%", height: "100%", backgroundColor: "red" }} />
      </div>
    </div>
  );
}

export default HeaderText;
