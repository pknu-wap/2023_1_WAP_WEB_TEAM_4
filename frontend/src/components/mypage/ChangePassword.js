import { Button, Stack, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

function ChangePassword() {
  const theme = useTheme();
  return (
    <Stack width="100%" p="24px" gap="36px">
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        justifyContent="space-between"
        direction="row"
        width="100%">
        <Stack direction="row">
          <Stack
            width="120px"
            alignItems="flex-start"
            justifyContent="center"
            fontSize="16px"
            fontWeight={600}>
            아이디
          </Stack>
          {/* <TextField size="small" fullWidth /> */}
          <Stack
            fontWeight="bold"
            justifyContent="center"
            alignItems="flex-start">
            Chaeyeon
          </Stack>
        </Stack>
        <Button
          variant="contained"
          sx={{ color: "white", marginRight: "32px" }}>
          저장
        </Button>
      </Stack>
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        direction="row">
        <Stack
          width="120px"
          alignItems="flex-start"
          fontSize="16px"
          justifyContent="center"
          fontWeight={600}>
          비밀번호
        </Stack>
        <TextField size="small" sx={{ width: "300px" }}>
          비밀번호 확인
        </TextField>
      </Stack>
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        direction="row">
        <Stack
          width="120px"
          alignItems="flex-start"
          fontSize="16px"
          justifyContent="center"
          fontWeight={600}>
          닉네임
        </Stack>
        <TextField size="small" sx={{ width: "300px" }}>
          비밀번호 확인
        </TextField>
      </Stack>
    </Stack>
  );
}

export default ChangePassword;
