import { useQuery } from "react-query";
import { defaultInstance } from "..";

export const PostCategorySaveApi = async (body) => {
  return await defaultInstance.post("/category/save", body);
};

// const queryClient = useQueryClient();
// const postRegister = useMutation(PostRegisterApi, {
//     onSuccess: () => navigate("/login"),
//     onError: (error) => {
//       alert(error.response.data);
//       // openSnackBar({ message: error.response.data, type: "error" });
//     },
//   });
//   postRegister.mutate(body);
export const PostCategoryDeleteApi = async (body) => {
  return await defaultInstance.post("/category/delete", body);
};

// const { data: rowsData } = useGetSafetyPlanQuery({id: "asdf"});
export const GetCategoryReadApi = async (params) => {
  const { data } = await defaultInstance.get("/main/more", { params });
  return data;
};

export const useGetCategoryReadQuery = (params) => {
  const { isLoading, error, data, status } = useQuery(
    [`CategoryRead`, params],
    () => GetCategoryReadApi(params)
  );
  return { data, isLoading, error, status };
};
