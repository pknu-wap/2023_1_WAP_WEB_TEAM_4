import { Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { PostChangeBlogSettingApi } from "../../apis/api/mypage-api";

const Blog = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const [edit, setEdit] = useState(false);
  const [blogName, setBlogName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setBlogName("Chaeyeon's blog");
    setDescription("채연입니다.");
  }, []);

  const queryClient = useQueryClient();

  const postChangeBlogSettingQuery = useMutation(PostChangeBlogSettingApi, {
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
            width="160px"
            alignItems="flex-start"
            justifyContent="center"
            fontSize="16px"
            color={theme.palette.background.color}
            fontWeight={600}>
            블로그 이름
          </Stack>
          {edit ? (
            <TextField size="small" />
          ) : (
            <Stack
              color={theme.palette.background.color}
              fontWeight="bold"
              justifyContent="center"
              alignItems="flex-start">
              {blogName}
            </Stack>
          )}
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
          width="160px"
          alignItems="flex-start"
          fontSize="16px"
          justifyContent="center"
          fontWeight={600}>
          한 줄 소개
        </Stack>
        {edit ? (
          <TextField size="small" />
        ) : (
          <Stack
            color={theme.palette.background.color}
            fontWeight="bold"
            justifyContent="center"
            alignItems="flex-start">
            {description}
          </Stack>
        )}
      </Stack>
      {isPhone && (
        <Button
          variant="contained"
          onClick={() => {
            setEdit(!edit);
            postChangeBlogSettingQuery.mutate({
              blogName,
              introduction: description,
            });
          }}>
          {edit ? "저장" : "편집"}
        </Button>
      )}
    </Stack>
  );
};

export default Blog;
