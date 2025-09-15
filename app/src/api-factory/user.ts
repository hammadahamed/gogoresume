import axios from "./axios";

const appTokenKey = "app-token";

const anonymousAuthorize = async (data: any) => {
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

const getTweaksUsage = async () => {
  const response = await axios.get("/users/profile/tweaks-usage");
  return response.data;
};

export default {
  anonymousAuthorize,
  getBootstrapData,
  getTweaksUsage,
};
