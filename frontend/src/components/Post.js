import { Stack } from "@mui/material";
import React from "react";
import ReactHtmlParser from "react-html-parser";

const Post = () => {
  const content =
    "<p>safasdfasdfasdf</p><h3>asdfasdf</h3><h2>sdfasdfadsf</h2><h2>#!@#!@#!@#</h2>";
  return (
    <Stack
      marginRight="100px"
      alignItems="flex-start"
      width="850px"
      marginTop="80px"
      justifyContent="center">
      <Stack>
        <Stack color="black" fontSize="32px" height="45px" fontWeight="bold">
          알고리즘에 대해 배워보자!
        </Stack>
        <Stack width="850px" height="2px" bgcolor="teal" marginBottom="24px" />
        <Stack>
          <Stack
            style={{
              margin: "0px",
              color: "black",
            }}
            gap="5px">
            {ReactHtmlParser(content, {
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
    </Stack>
  );
};

export default Post;
