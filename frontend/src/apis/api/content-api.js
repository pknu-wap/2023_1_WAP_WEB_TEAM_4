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
export const PostPlusLikesApi = async (body) => {
  return await defaultInstance.post("/content/pluslikes", body);
};

export const PostDeleteApi = async (body) => {
  return await defaultInstance.post("/content/delete", body);
};

export const PostCreateApi = async (body) => {
  return await defaultInstance.post("/content/create", body);
};

export const GetMainApi = async (params) => {
  const { data } = await defaultInstance.get("/main", { params });
  return data;
};

export const useGetMainQuery = (params) => {
  const { isLoading, error, data, status } = useQuery(
    [`Main`, params],
    () => GetMainApi(params),
    {
      refetchOnMount: "always",
    }
  );
  return { data, isLoading, error, status };
};

export const GetMainMoreApi = async (params) => {
  const { data } = await defaultInstance.get("/main/more", { params });
  return data;
};

export const useGetMainMoreQuery = (params) => {
  const { isLoading, error, data, status } = useQuery(
    [`MainMore`, params],
    () => GetMainMoreApi(params)
  );
  return { data, isLoading, error, status };
};

export const GetContentReadApi = async (params) => {
  const { data } = await defaultInstance.get("/content/read", { params });
  return data;
};

export const useGetContentReadQuery = (params) => {
  const { isLoading, error, data, status } = useQuery(
    [`ContentRead`, params],
    () => GetContentReadApi(params)
  );
  return { data, isLoading, error, status };
};

// const { data: rowsData } = useGetSafetyPlanQuery({id: "asdf"});
export const GetContentFindApi = async (params) => {
  const { data } = await defaultInstance.get("/main/more", { params });
  return data;
};

export const useGetContentFindQuery = (params) => {
  const { isLoading, error, data, status } = useQuery(
    [`ContentFind`, params],
    () => GetContentFindApi(params)
  );
  return { data, isLoading, error, status };
};
