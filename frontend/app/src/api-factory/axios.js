import axios from "axios";
import ApiUtils from "./api-util";

const baseURL = ApiUtils.getBaseURL();
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 120000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("app-token");
    if (token && token !== "undefined") {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     const token = response.headers["x-auth-token"];
//     if (token) {
//       localStorage.setItem("admin-token", token);
//     }
//     return response.data ? response.data : response;
//   },
//   (error) => Promise.reject(error.response)
// );

export default axiosInstance;
