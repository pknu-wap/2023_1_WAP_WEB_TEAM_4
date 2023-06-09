import { useQuery } from "react-query";
import { defaultInstance } from "..";

export const PostPlusLikesApi = async (body) => {
  return await defaultInstance.post("/content/pluslikes", body);
};

export const PostDeleteApi = async (body) => {
  return await defaultInstance.post("/content/delete", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
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

export const GetFindStringApi = async (params) => {
  const { data } = await defaultInstance.get("/content/find/string", {
    params,
  });
  return data;
};

export const useGetFindStringQuery = (params) => {
  const { isLoading, error, data, status } = useQuery(
    [`FindString`, params],
    () => GetFindStringApi(params),
    {
      enabled: params.string.length > 0,
    }
  );
  return { data, isLoading, error, status };
};

export const GetFindHashtagApi = async (params) => {
  const { data } = await defaultInstance.get("/content/find/hashtag", {
    params,
  });
  return data;
};

export const useGetFindHashtagQuery = (params) => {
  const { isLoading, error, data, status } = useQuery(
    [`FindHashtag`, params],
    () => GetFindHashtagApi(params)
  );
  return { data, isLoading, error, status };
};

export const GetFindMemberApi = async (params) => {
  const { data } = await defaultInstance.get("/content/find/hashtag", {
    params,
  });
  return data;
};

export const useGetFindMemberQuery = (params) => {
  const { isLoading, error, data, status } = useQuery(
    [`FindMember`, params],
    () => GetFindMemberApi(params)
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
    () => GetContentReadApi(params),
    {
      enabled: !!params.cid,
    }
  );
  return { data, isLoading, error, status };
};

export const GetHomeApi = async (params) => {
  const { data } = await defaultInstance.get("/home", { params });
  return data;
};

export const useGetHomeQuery = (params) => {
  const { isLoading, error, data, status } = useQuery(
    [`Home`, params],
    () => GetHomeApi(params),
    {
      enabled: !!params.memberId,
    }
  );
  return { data, isLoading, error, status };
};
