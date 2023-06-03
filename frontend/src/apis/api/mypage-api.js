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

// export const PostCreateApi = async (body) => {
//   return await defaultInstance.post("/content/create", body);
// };

// const { data: rowsData } = useGetSafetyPlanQuery({id: "asdf"});
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
