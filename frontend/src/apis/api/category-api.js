import { useQuery } from "react-query";
import { defaultInstance } from "..";

export const PostCategoryCreateApi = async (body) => {
  return await defaultInstance.post("/category/create", body);
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
export const GetCategoryApi = async () => {
  const { data } = await defaultInstance.get("/category/get");

  console.log(data);
  return data;
};

export const useGetCategoryQuery = () => {
  const { isLoading, error, data, status } = useQuery(
    [`CategoryRead`],
    () => GetCategoryApi(),
    {
      refetchOnMount: "always",
    }
  );
  return { data, isLoading, error, status };
};
