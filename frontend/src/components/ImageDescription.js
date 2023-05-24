import { Stack } from "@mui/material";
import React from "react";

const ImageDescription = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ width: "80%" }}>
      {/* <Stack flexDirection="row" alignItems="center"> */}
      <Stack
        width="50%"
        height="330px"
        marginTop="170px"
        marginLeft="100px"
        backgroundColor="white"
      />
      <Stack
        width="50%"
        height="60px"
        // marginTop="170px"
        // marginLeft="100px"
        paddingTop="10em"
        paddingLeft="5em"
        color="white">
        저희 대박 징조는 폴더별로 나눠서 파일을 관리할 수 있습니다
      </Stack>
      {/* <motion.div
              animate={{
                x: 0,
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                width: "300px",
                height: "300px",
                backgroundColor: "#ffffff",
                boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
                position: "fixed",
                transitionEnd: {
                  display: "none",
                },
              }}
            /> */}
      {/* <motion.div style={{ background }}>
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ x }}>
                <Icon x={x} />
              </motion.div>
            </motion.div>

            <motion.div style={{ scale }}>
              <motion.div
                style={{
                  width: "500px",
                  height: "600px",
                  backgroundColor: "red",
                  scaleY: scrollYProgress,
                }}
              />
            </motion.div> */}
    </Stack>
  );
};

export default ImageDescription;
