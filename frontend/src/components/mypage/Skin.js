import { Button, Stack, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

function Skin() {
  const theme = useTheme();
  return (
    <Stack width="100%" p="24px" gap="36px">
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        justifyContent="space-between"
        direction="row">
        <Stack direction="row">
          <Stack
            width="120px"
            alignItems="flex-start"
            justifyContent="center"
            fontSize="16px"
            fontWeight={600}>
            스킨 설정
          </Stack>
          <Stack direction="row" gap="16px">
            <Button variant="outlined">Light</Button>
            <Button variant="contained" sx={{ color: "white" }}>
              Dark
            </Button>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          sx={{ color: "white", marginRight: "32px" }}>
          저장
        </Button>
      </Stack>
    </Stack>
  );
}

export default Skin;
