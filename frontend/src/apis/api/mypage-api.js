import { useQuery } from "react-query";
import { defaultInstance } from "..";

// const queryClient = useQueryClient();
// const postRegister = useMutation(PostRegisterApi, {
//     onSuccess: () => navigate("/login"),
//     onError: (error) => {
//       alert(error.response.data);
//       // openSnackBar({ message: error.response.data, type: "error" });
//     },
//   });
//   postRegister.mutate(body);

// export const PostPlusLikesApi = async (body) => {
//   return await defaultInstance.post("/content/pluslikes", body);
// };

// export const PostDeleteApi = async (body) => {
//   return await defaultInstance.post("/content/delete", body, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

export const PostChangeProfileApi = async (body) => {
  return await defaultInstance.post("/mypage/change/profile", body);
};

export const PostChangeBlogSkinApi = async (body) => {
  return await defaultInstance.post("/mypage/change/blog/skin", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PostChangeBlogSettingApi = async (body) => {
  return await defaultInstance.post("/mypage/change/blog/setting", body);
};

export const PostChangeAccountApi = async (body) => {
  return await defaultInstance.post("/mypage/change/account", body);
};

export const GetMypageApi = async () => {
  const { data } = await defaultInstance.get("/mypage");
  return data;
};

export const useGetMypageQuery = () => {
  const { isLoading, error, data, status } = useQuery([`mypage`], () =>
    GetMypageApi()
  );
  return { data, isLoading, error, status };
};
