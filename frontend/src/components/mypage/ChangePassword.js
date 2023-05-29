import { Stack, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

function ChangePassword() {
  const theme = useTheme();
  return (
    <Stack
      // border={`1px solid ${theme.palette.primary.main}`}
      width="100%"
      bgcolor="background.contractColor"
      alignItems="flex-start"
      borderRadius="0px 10px 10px 0px"
      gap="24px">
      <Stack
        // width="300px"
        width="100%"
        alignItems="center"
        p="4%"
        color="primary.main"
        // borderRadius="10px"
        // border={`1px solid ${theme.palette.primary.main}`}
      >
        비밀번호 확인
      </Stack>
      <TextField size="small" fullWidth>
        비밀번호 확인
      </TextField>
    </Stack>
  );
}

export default ChangePassword;
