import { useQuery } from "react-query";
import { defaultInstance } from "..";

export const PostCategoryCreateApi = async (body) => {
  return await defaultInstance.post("/category/create", body);
};

export const PostCategoryDeleteApi = async (body) => {
  return await defaultInstance.post("/category/delete", body);
};

export const GetCategoryApi = async (params) => {
  const { data } = await defaultInstance.get("/category/get", { params });
  return data;
};

export const useGetCategoryQuery = (params) => {
  const { isLoading, error, data, status } = useQuery(
    [`CategoryRead`, params],
    () => GetCategoryApi(params),
    {
      refetchOnMount: "always",
    }
  );
  return { data, isLoading, error, status };
};
