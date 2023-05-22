import { defaultInstance } from "../../apis";
import { useQuery } from "react-query";

export const PostRegisterApi = async (body) => {
  return await defaultInstance.post("/member/register", body);
};
