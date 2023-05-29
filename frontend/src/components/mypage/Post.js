import { Stack, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

function Post() {
  const theme = useTheme();
  return (
    <Stack
      // border={`1px solid ${theme.palette.primary.main}`}
      justifyContent="center"
      width="100%"
      maxWidth="400px"
      bgcolor="background.contractColor"
      border={`1px solid ${theme.palette.primary.main}`}
      alignItems="center"
      borderRadius="0px 10px 10px 0px"
      borderLeft="0px solid black"
      gap="24px"
      //   marginLeft="-10px"
      p="8%">
      <Stack
        width="300px"
        alignItems="center"
        p="4%"
        color="primary.main"
        borderRadius="10px"
        border={`1px solid ${theme.palette.primary.main}`}>
        방명록
      </Stack>
      <TextField size="small">비밀번호 확인</TextField>
    </Stack>
  );
}

export default Post;
