import axios from "./axios";

const appTokenKey = "app-token";

const anonymousAuthorize = async (data) => {
  const token = localStorage.getItem(appTokenKey);
  if (!token || token == "undefined") {
    const response = await axios.post("/auth/anonymous", data);
    localStorage.setItem(appTokenKey, response.data.token);
  }
};

const getBootstrapData = async () => {
  const response = await axios("/auth/bootstrap");
  return response.data;
};

const saveUserProfile = async (userInfo) => {
  const response = await axios.post("/user-profile", userInfo);
  return response.data;
};

const getUserProfile = async () => {
  const response = await axios.get("/user-profile");
  return response.data;
};

export default {
  anonymousAuthorize,
  getBootstrapData,
  saveUserProfile,
  getUserProfile,
};
