import { Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

const ChangePassword = () => {
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
            width="120px"
            alignItems="flex-start"
            justifyContent="center"
            fontSize="16px"
            color={theme.palette.background.color}
            fontWeight={600}>
            아이디
          </Stack>
          {/* <TextField size="small" fullWidth /> */}
          <Stack
            color={theme.palette.background.color}
            fontWeight="bold"
            justifyContent="center"
            alignItems="flex-start">
            Chaeyeon
          </Stack>
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
          width="120px"
          alignItems="flex-start"
          fontSize="16px"
          justifyContent="center"
          fontWeight={600}>
          비밀번호
        </Stack>
        <TextField size="small" />
      </Stack>
      <Stack
        bgcolor="background.contractColor"
        borderRadius="0px 10px 10px 0px"
        direction="row">
        <Stack
          width="120px"
          color={theme.palette.background.color}
          alignItems="flex-start"
          fontSize="16px"
          justifyContent="center"
          fontWeight={600}>
          닉네임
        </Stack>
        <TextField size="small" />
      </Stack>
      {isPhone && <Button variant="contained">저장</Button>}
    </Stack>
  );
};

export default ChangePassword;
