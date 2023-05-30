import { Button, Stack, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeState } from "../../states/common";

function Skin() {
  const theme = useTheme();
  const [userTheme, setUserTheme] = useRecoilState(themeState);
  return (
    <Stack width="100%" p="24px" gap="36px">
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        justifyContent="space-between"
        direction="row"
      >
        <Stack direction="row">
          <Stack
            width="120px"
            alignItems="flex-start"
            justifyContent="center"
            fontSize="16px"
            fontWeight={600}
            color={theme.palette.background.color}
          >
            스킨 설정
          </Stack>
          <Stack direction="row" gap="16px">
            <Button variant="outlined" onClick={() => setUserTheme("LIGHT")}>
              Light
            </Button>
            <Button
              variant="contained"
              sx={{ color: "white" }}
              onClick={() => setUserTheme("DARK")}
            >
              Dark
            </Button>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          sx={{
            color: theme.palette.background.contractColor,
            marginRight: "32px",
          }}
        >
          저장
        </Button>
      </Stack>
    </Stack>
  );
}

export default Skin;
