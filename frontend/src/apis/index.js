import axios from "axios";

const axiosApi = (url, data) => {
  const instance = axios.create({
    baseURL: url,
    withCredentials: true,

    ...data,
  });
  return instance;
};

export const defaultInstance = axiosApi(
  "http://test-env.eba-babq7paf.us-east-1.elasticbeanstalk.com"
);
