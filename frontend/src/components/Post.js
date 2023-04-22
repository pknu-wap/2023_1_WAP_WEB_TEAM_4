import { Button, Stack } from "@mui/material";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import { useRecoilState } from "recoil";
import { postState, titleState } from "../states/writeState";

const Post = () => {
  const [post, setPost] = useRecoilState(postState);
  const [title, setTitle] = useRecoilState(titleState);

  return (
    <Stack
      marginRight="100px"
      alignItems="flex-start"
      width="850px"
      marginTop="80px"
      justifyContent="center">
      {title && (
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack
              color="background.color"
              fontSize="32px"
              height="45px"
              fontWeight="bold">
              {title}
            </Stack>
            <Stack direction="row">
              <Button>수정</Button>
              <Button color="error">삭제</Button>
            </Stack>
          </Stack>
          <Stack
            width="850px"
            height="2px"
            bgcolor="primary.500"
            marginBottom="24px"
          />
          <Stack>
            <Stack
              sx={{
                margin: "0px",
                color: "background.color",
              }}
              gap="5px">
              {ReactHtmlParser(post, {
                transform: (node, index) => {
                  console.log(node.type);
                  console.log(node);
                  if (node.type === "tag") {
                    node.attribs = { ...node.attribs, style: "margin: 0;" };
                  }
                },
              })}
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Post;
