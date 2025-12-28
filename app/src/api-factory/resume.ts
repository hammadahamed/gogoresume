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

const saveResume = async (name: string, data: any, templateId?: string) => {
  const response = await axios.post("resume/save", {
    name,
    data,
    templateId,
  });
  return response.data;
};

const updateResume = async (
  resumeId: string,
  name: string,
  data: any,
  templateId?: string
) => {
  const response = await axios.put(`resume/save/${resumeId}`, {
    name,
    data,
    templateId,
  });
  return response.data;
};

const getSavedResumes = async () => {
  const response = await axios.get("resume/saved");
  return response.data;
};

const getResumeById = async (resumeId: string) => {
  const response = await axios.get(`resume/saved/${resumeId}`);
  return response.data;
};

const deleteResume = async (resumeId: string) => {
  const response = await axios.delete(`resume/saved/${resumeId}`);
  return response.data;
};

const parseResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("resume/parse", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default {
  tweakResume,
  saveUserProfile,
  getUserProfile,
  saveResume,
  updateResume,
  getSavedResumes,
  getResumeById,
  deleteResume,
  parseResume,
};
