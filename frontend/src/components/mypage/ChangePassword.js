import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation, useQueryClient } from "react-query";
import {
  PostChangeAccountApi,
  PostChangeProfileApi,
} from "../../apis/api/mypage-api";
import Snackbar from "../Snackbar";

const ChangePassword = ({ id, nickname, setNickname, memberId }) => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const postChangeAccountQuery = useMutation(PostChangeAccountApi, {
    onSuccess: () => queryClient.invalidateQueries("mypage"),
    onError: (error) => {
      alert(error.response.data);
    },
  });

  const profileSave = () => {
    if (edit) {
      if (password === passwordCheck) {
        postChangeAccountQuery.mutate({
          loginedMemberId: memberId,
          pw: password,
          nickname,
        });

        setEdit(!edit);
      } else {
        setOpen(true);
      }
    } else {
      setEdit(!edit);
    }
  };

  return (
    <Stack width="100%" paddingBottom="24px" gap="36px">
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
          <Stack
            color={theme.palette.background.color}
            fontWeight="bold"
            justifyContent="center"
            alignItems="flex-start">
            {id}
          </Stack>
        </Stack>
        {!isPhone && (
          <Button
            variant="contained"
            onClick={profileSave}
            sx={{
              color: theme.palette.background.contractColor,
              marginRight: "32px",
            }}>
            {edit ? "저장" : "편집"}
          </Button>
        )}
      </Stack>
      {edit && (
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
          <Stack direction="row">
            <TextField
              size="small"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={visible ? "text" : "password"}
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setVisible(!visible)}
              edge="end">
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Stack>
        </Stack>
      )}
      {edit && (
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
            비밀번호 확인
          </Stack>
          <Stack direction="row">
            <TextField
              size="small"
              value={passwordCheck}
              onChange={(event) => setPasswordCheck(event.target.value)}
              type={visible ? "text" : "password"}
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setVisible(!visible)}
              edge="end">
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Stack>
        </Stack>
      )}
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
        {edit ? (
          <TextField
            size="small"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        ) : (
          <Stack
            color={theme.palette.background.color}
            fontWeight="bold"
            justifyContent="center"
            alignItems="flex-start">
            {nickname}
          </Stack>
        )}
      </Stack>
      {isPhone && (
        <Button variant="contained" onClick={profileSave}>
          {edit ? "저장" : "편집"}
        </Button>
      )}
      <Snackbar
        open={open}
        setOpen={setOpen}
        title="비밀번호와 비밀번호 확인이 일치하지 않습니다."
        color="error"
      />
    </Stack>
  );
};

export default ChangePassword;
