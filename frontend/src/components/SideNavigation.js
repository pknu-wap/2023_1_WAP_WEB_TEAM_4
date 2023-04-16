import { Stack } from "@mui/material";
import React from "react";

const SideNavigation = () => {
  return (
    <Stack
      boxShadow="0px 0px 1px"
      style={{
        backgroundColor: "#e5e5e5",
        width: "210px",
        height: "100%",
        left: 0,
        padding: "100px 10px 20px 10px",
        position: "fixed",
      }}>
      <Stack
        style={{
          color: "black",
          fontSize: "21",
          padding: "0px 0px 10px 10px",
          fontWeight: "bold",
        }}>
        새 페이지
      </Stack>
      <Stack gap="10px">
        <Stack>
          <Stack
            fontSize="18px"
            color="#0c3941"
            height="30px"
            paddingLeft="10px"
            marginBottom="5px"
            justifyContent="center"
            fontWeight="bold">
            파이썬
          </Stack>
          <Stack>
            <Stack
              justifyContent="center"
              sx={{
                ":hover": {
                  backgroundColor: "#C6E3CC",
                },
              }}
              fontSize="16px"
              padding="0px 0px 5px 20px"
              color="#4D999D"
              height="25px">
              - 알고리즘
            </Stack>
            <Stack
              justifyContent="center"
              sx={{
                ":hover": {
                  backgroundColor: "#C6E3CC",
                },
              }}
              fontSize="16px"
              padding="0px 0px 5px 20px"
              color="black"
              height="25px">
              - 머신러닝
            </Stack>
            <Stack
              justifyContent="center"
              sx={{
                ":hover": {
                  backgroundColor: "#C6E3CC",
                },
              }}
              fontSize="16px"
              padding="0px 0px 5px 20px"
              color="black"
              height="25px">
              - 데이터 분석
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SideNavigation;
