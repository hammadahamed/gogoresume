import axios from "./axios";

// const appTokenKey = "app-token";

const tweakResume = async (body: any) => {
  const response = await axios.post("resume/tweak", body);
  return response.data;
};

const saveUserProfile = async (userInfo: any) => {
  const response = await axios.post("resume/user-profile", userInfo);
  return response.data;
};

const getUserProfile = async () => {
  const response = await axios.get("resume/user-profile");
  return response.data;
};

export default {
  tweakResume,
  saveUserProfile,
  getUserProfile,
};
