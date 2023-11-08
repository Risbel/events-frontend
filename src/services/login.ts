import httpService from "@/config/axios.config";

const login = async (formData) => {
  try {
    const response = await httpService.post("/login", formData);

    return response.data;
  } catch (error) {
    return error;
  }
};

export default login;
