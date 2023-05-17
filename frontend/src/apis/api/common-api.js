import { defaultInstance } from "..";
import { useQuery } from "react-query";

export const PostRegisterApi = async (body) => {
  return await defaultInstance.post("/user/register", body);
};
