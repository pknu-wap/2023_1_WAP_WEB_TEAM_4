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
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    setId("Chae yeon");
    setPassword("password");
    setNickName("채연");
  }, []);
  const queryClient = useQueryClient();

  const postChangeProfileQuery = useMutation(PostChangeProfileApi, {
    onSuccess: () => queryClient.invalidateQueries("mypage"),
    onError: (error) => {
      alert(error.response.data);
    },
  });

  const postChangeAccountQuery = useMutation(PostChangeAccountApi, {
    onSuccess: () => queryClient.invalidateQueries("mypage"),
    onError: (error) => {
      alert(error.response.data);
    },
  });

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
            onClick={() => setEdit(!edit)}
            sx={{
              color: theme.palette.background.contractColor,
              marginRight: "32px",
            }}>
            {edit ? "저장" : "편집"}
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
        {edit ? (
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
        ) : (
          <Stack
            color={theme.palette.background.color}
            fontWeight="bold"
            justifyContent="center"
            alignItems="flex-start">
            {password}
          </Stack>
        )}
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
          value={nickName}
          onChange={(event) => setNickName(event.target.value)}
          fontWeight={600}>
          닉네임
        </Stack>
        {edit ? (
          <TextField size="small" />
        ) : (
          <Stack
            color={theme.palette.background.color}
            fontWeight="bold"
            justifyContent="center"
            alignItems="flex-start">
            {nickName}
          </Stack>
        )}
      </Stack>
      {isPhone && (
        <Button
          variant="contained"
          onClick={() => {
            setEdit(!edit);
            postChangeProfileQuery();
            postChangeAccountQuery.mutate({ pw: password, nickname: nickName });
          }}>
          {edit ? "저장" : "편집"}
        </Button>
      )}
    </Stack>
  );
};

export default ChangePassword;
