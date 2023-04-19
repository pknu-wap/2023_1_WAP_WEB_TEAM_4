import { IconButton, Stack } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { mint } from "../static/style/color";

const SideNavigation = () => {
  const navigate = useNavigate();
  return (
    <Stack
      boxShadow="0px 0px 1px"
      backgroundColor="#e5e5e5"
      width="210px"
      height="100%"
      left={0}
      padding="95px 10px 20px 10px"
      position="fixed">
      <Stack direction="row" alignItems="center" marginBottom="5px">
        <IconButton
          width="16px"
          height="16px"
          onClick={() => navigate("/write")}>
          <AddIcon />
        </IconButton>
        <Stack
          style={{
            color: "black",
            fontSize: "16px",
            fontWeight: "bold",
          }}>
          글쓰기
        </Stack>
      </Stack>
      <Stack gap="16px">
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
                borderRadius="4px"
                sx={{
                  ":hover": {
                    backgroundColor: "#C6E3CC",
                  },
                  ":active": {
                    backgroundColor: "#B5DBBC",
                  },
                  cursor: "pointer",
                }}
                fontSize="16px"
                padding="0px 0px 5px 20px"
                color={mint[600]}
                height="25px">
                - 알고리즘
              </Stack>
              <Stack
                justifyContent="center"
                borderRadius="4px"
                sx={{
                  ":hover": {
                    backgroundColor: "#C6E3CC",
                    ":active": {
                      backgroundColor: "#B5DBBC",
                    },
                    cursor: "pointer",
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
                borderRadius="4px"
                sx={{
                  ":hover": {
                    backgroundColor: "#C6E3CC",
                    ":active": {
                      backgroundColor: "#B5DBBC",
                    },
                    cursor: "pointer",
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
                borderRadius="4px"
                sx={{
                  ":hover": {
                    backgroundColor: "#C6E3CC",
                  },
                  ":active": {
                    backgroundColor: "#B5DBBC",
                  },
                  cursor: "pointer",
                }}
                fontSize="16px"
                padding="0px 0px 5px 20px"
                color={mint[600]}
                height="25px">
                - 알고리즘
              </Stack>
              <Stack
                justifyContent="center"
                borderRadius="4px"
                sx={{
                  ":hover": {
                    backgroundColor: "#C6E3CC",
                    ":active": {
                      backgroundColor: "#B5DBBC",
                    },
                    cursor: "pointer",
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
                borderRadius="4px"
                sx={{
                  ":hover": {
                    backgroundColor: "#C6E3CC",
                    ":active": {
                      backgroundColor: "#B5DBBC",
                    },
                    cursor: "pointer",
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
    </Stack>
  );
};

export default SideNavigation;
