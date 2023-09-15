import { Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useRecoilState } from "recoil";
import { themeState } from "../../states/common";

function Skin() {
  const theme = useTheme();
  const [userTheme, setUserTheme] = useRecoilState(themeState);

  return (
    <Stack width="100%" gap="36px" p="24px">
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        justifyContent="flex-start"
        direction="row">
        <Stack direction="row">
          <Stack
            width="120px"
            alignItems="flex-start"
            justifyContent="center"
            fontSize="16px"
            fontWeight={600}
            color={theme.palette.background.color}>
            스킨 설정
          </Stack>
          <Stack direction="row" gap={{ xs: "0px", md: "16px" }}>
            <Button variant="outlined" onClick={() => setUserTheme("LIGHT")}>
              Light
            </Button>
            <Button
              variant="contained"
              sx={{ color: "white" }}
              onClick={() => setUserTheme("DARK")}>
              Dark
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Skin;
