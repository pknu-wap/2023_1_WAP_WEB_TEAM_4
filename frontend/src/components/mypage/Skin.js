import { Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeState } from "../../states/common";
import { useMutation, useQueryClient } from "react-query";
import { PostChangeBlogSkinApi } from "../../apis/api/mypage-api";

function Skin() {
  const theme = useTheme();
  const [userTheme, setUserTheme] = useRecoilState(themeState);
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const queryClient = useQueryClient();

  const postChangeBlogSkinQuery = useMutation(PostChangeBlogSkinApi, {
    onSuccess: () => queryClient.invalidateQueries("mypage"),
    onError: (error) => {
      alert(error.response.data);
    },
  });

  return (
    <Stack width="100%" gap="36px">
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        justifyContent="space-around"
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
        {!isPhone && (
          <Button
            variant="contained"
            sx={{
              color: theme.palette.background.contractColor,
            }}>
            저장
          </Button>
        )}
      </Stack>
      {isPhone && (
        <Button
          variant="contained"
          onClick={() =>
            postChangeBlogSkinQuery.mutate(userTheme === "LIGHT" ? 0 : 1)
          }>
          저장
        </Button>
      )}
    </Stack>
  );
}

export default Skin;
