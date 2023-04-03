import React from "react";

const SideNavigation = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        width: "210px",
        height: "5000px",
        marginTop: "105px",
        borderRight: "1px solid white",
        position: "fixed",
        paddingLeft: "10px",
      }}>
      <div
        style={{
          color: "white",
          fontSize: "21",
          padding: "0px 0px 10px 0px",
        }}>
        페이지
      </div>
      <div>
        <div
          style={{
            fontSize: "18px",
            color: "#ECD8A4",
            paddingBottom: "10px",
          }}>
          ● 파이썬
        </div>
        <div>
          <div
            style={{
              fontSize: "16px",
              padding: "0px 0px 5px 20px",
              color: "#ECD8A4",
            }}>
            - 알고리즘
          </div>
          <div
            style={{
              color: "white",
              fontSize: "16px",
              padding: "0px 0px 5px 20px",
            }}>
            - ML
          </div>
          <div
            style={{
              color: "white",
              fontSize: "16px",
              padding: "0px 0px 5px 20px",
            }}>
            - 데이터분석
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: "18px",
            color: "white",
            padding: "25px 0px 10px 0px",
          }}>
          ● 프론트엔드
        </div>
        <div>
          <div
            style={{
              fontSize: "16px",
              padding: "0px 0px 5px 20px",

              color: "white",
            }}>
            - HTML
          </div>
          <div
            style={{
              color: "white",
              fontSize: "16px",
              padding: "0px 0px 5px 20px",
            }}>
            - CSS
          </div>
          <div
            style={{
              color: "white",
              fontSize: "16px",
              padding: "0px 0px 5px 20px",
            }}>
            - javascript
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
