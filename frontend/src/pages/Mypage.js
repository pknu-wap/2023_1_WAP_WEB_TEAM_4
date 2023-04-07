import React from "react";
import { Header } from "../components/Header";

function Mypage() {
  return (
    <div style={{ width: "100%", height: "3000px", backgroundColor: "black" }}>
      <Header />
      <div
        style={{
          width: "100%",
          height: "500px",
          backgroundColor: "#ECD8A4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <div
          style={{
            width: "50%",
            height: "100px",
            backgroundColor: "orange",
            justifyContent: "center",
          }}>
          <div>비밀번호 확인</div>

          <input type="text" style={{ width: "99%", height: "30px" }}></input>
          <button>확인</button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
