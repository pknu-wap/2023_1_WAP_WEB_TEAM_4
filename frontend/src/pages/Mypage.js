import React from "react";

function Mypage() {
  return (
    <div style={{ width: "100%", height: "3000px", backgroundColor: "black" }}>
      <div
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ width: "10%", height: "100%", backgroundColor: "yellow" }}
        >
          <div>SUNGWOO'S BLOG</div>
        </div>

        <div
          style={{
            width: "20%",
            height: "100%",
            backgroundColor: "blue",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{ width: "50%", height: "100%", backgroundColor: "green" }}
          ></div>

          <div
            style={{ width: "50%", height: "100%", backgroundColor: "red" }}
          ></div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "500px",
          backgroundColor: "#ECD8A4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100px",
            backgroundColor: "orange",
            justifyContent: "center",
          }}
        >
          <div>비밀번호 확인</div>

          <input type="text" style={{ width: "99%", height: "30px" }}></input>
          <button>확인</button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
