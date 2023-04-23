import { atom } from "recoil";

// export const postState = atom({
//   key: "post",
//   default: "",
// });
// export const titleState = atom({
//   key: "title",
//   default: "",
// });
export const postState = atom({
  key: "post",
  // default:
  //   "<h1>Post</h1><h2>Post</h2><h3>Post</h3><h1>Post</h1><h2>Post</h2><h3>Post</h3><h1>Post</h1><h2>Post</h2><h3>Post</h3><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1><h1>Post</h1>",
  default:
    "#### asdfsafasdf \n\n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n# asdfasdfasdf \n## asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf \n### asdfasdfasdf",
});
export const titleState = atom({
  key: "title",
  default: "Title",
});

export const sectionsState = atom({
  key: "sections",
  default: [],
});
