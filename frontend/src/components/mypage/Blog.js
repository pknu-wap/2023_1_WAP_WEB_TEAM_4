import { Button, Stack, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

function Blog() {
  const theme = useTheme();
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
            color={theme.palette.background.color}
            fontWeight={600}
          >
            블로그 이름
          </Stack>
          <TextField size="small" sx={{ width: "300px" }} />
        </Stack>
        <Button
          variant="contained"
          sx={{ color: "white", marginRight: "32px" }}
        >
          저장
        </Button>
      </Stack>
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        direction="row"
      >
        <Stack
          width="120px"
          alignItems="flex-start"
          fontSize="16px"
          color={theme.palette.background.color}
          justifyContent="center"
          fontWeight={600}
        >
          한줄 소개
        </Stack>
        <TextField size="small" sx={{ width: "300px" }} />
      </Stack>
    </Stack>
  );
}

export default Blog;
