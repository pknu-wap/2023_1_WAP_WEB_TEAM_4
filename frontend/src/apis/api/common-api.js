import { useQuery } from "react-query";
import { defaultInstance } from "..";

export const PostRegisterApi = async (body) => {
  return await defaultInstance.post("/member/register", body);
};

export const PostLoginApi = async (body) => {
  return await defaultInstance.post("/member/login", body);
};

export const GetLogoutApi = async (body) => {
  return await defaultInstance.get("/member/logout", body);
};
