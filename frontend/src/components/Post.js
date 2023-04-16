import { Stack } from "@mui/material";
import React from "react";

const Post = () => {
  return (
    <Stack
      marginRight="100px"
      alignItems="flex-start"
      width="850px"
      marginTop="80px"
      justifyContent="center">
      <Stack>
        <Stack color="black" fontSize="32px" height="45px" fontWeight="bold">
          알고리즘에 대해 배워보자!
        </Stack>
        <Stack width="850px" height="2px" bgcolor="teal" marginBottom="24px" />
        <Stack>
          <Stack
            style={{
              color: "black",
              fontSize: "24px",
              paddingBottom: "12px",
              fontWeight: "bold",
            }}>
            알고리즘
          </Stack>
          <Stack
            style={{
              color: "black",
              paddingBottom: "12px",
              fontSize: "16px",
            }}>
            알고리즘은 신기하다.
          </Stack>
          <Stack
            style={{
              color: "black",
              paddingBottom: "12px",
              fontSize: "20px",
              fontWeight: "bold",
            }}>
            알고리즘이 신기한 이유?
          </Stack>
          <Stack
            style={{
              color: "black",
              paddingBottom: "12px",
              fontSize: "16px",
            }}>
            모르겠다.
          </Stack>
          <Stack
            style={{
              color: "black",
              paddingBottom: "12px",
              fontSize: "20px",
              fontWeight: "bold",
            }}>
            알고리즘이 안신기해지려면?
          </Stack>
          <Stack
            style={{
              color: "black",
              paddingBottom: "12px",
              fontSize: "15px",
            }}>
            모르겠다.
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Post;
