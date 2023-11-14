import httpService from "@/config/axios.config";

const login = async (formData: any) => {
  const response = await httpService.post("/login", formData);

  return response.data;
};

export default login;
