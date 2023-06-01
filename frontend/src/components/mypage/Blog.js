import { Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

const Blog = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Stack width="100%" gap="36px">
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        justifyContent="space-between"
        direction="row"
        width="100%">
        <Stack direction="row">
          <Stack
            width="160px"
            alignItems="flex-start"
            justifyContent="center"
            fontSize="16px"
            color={theme.palette.background.color}
            fontWeight={600}>
            블로그 이름
          </Stack>
          <TextField size="small" />
        </Stack>
        {!isPhone && (
          <Button
            variant="contained"
            sx={{
              color: theme.palette.background.contractColor,
              marginRight: "32px",
            }}>
            저장
          </Button>
        )}
      </Stack>
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        direction="row">
        <Stack
          color={theme.palette.background.color}
          width="160px"
          alignItems="flex-start"
          fontSize="16px"
          justifyContent="center"
          fontWeight={600}>
          한 줄 소개
        </Stack>
        <TextField size="small" />
      </Stack>
      {isPhone && <Button variant="contained">저장</Button>}
    </Stack>
  );
};

export default Blog;
