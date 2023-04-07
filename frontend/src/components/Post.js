import React from "react";

const Post = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "black",
        padding: "122px 280px 84px 200px",
        width: "100%",
        height: "4000px",
      }}>
      <div
        style={{
          backgroundColor: "black",
          width: "70%",
          display: "flex",
          justifyContent: "center",
        }}>
        <div>
          <div
            style={{
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
              paddingBottom: "24px",
            }}>
            알고리즘에 대해 배워보자!
          </div>
          <div>
            <div
              style={{
                color: "white",
                fontSize: "24px",
                paddingBottom: "12px",
                fontWeight: "bold",
              }}>
              알고리즘
            </div>
            <div
              style={{
                color: "white",
                paddingBottom: "12px",
                fontSize: "16px",
              }}>
              알고리즘은 신기하다.
            </div>
            <div
              style={{
                color: "white",
                paddingBottom: "12px",
                fontSize: "20px",
                fontWeight: "bold",
              }}>
              알고리즘이 신기한 이유?
            </div>
            <div
              style={{
                color: "white",
                paddingBottom: "12px",
                fontSize: "16px",
              }}>
              모르겠다.
            </div>
            <div
              style={{
                color: "white",
                paddingBottom: "12px",
                fontSize: "20px",
                fontWeight: "bold",
              }}>
              알고리즘이 안신기해지려면?
            </div>
            <div
              style={{
                color: "white",
                paddingBottom: "12px",
                fontSize: "15px",
              }}>
              모르겠다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
