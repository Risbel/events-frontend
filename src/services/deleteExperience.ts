import httpService from "@/config/axios.config";

export const deleteExperience = async (id: string) => {
  const response = await httpService.delete(`/discoImage/${id}`);
  return response.data;
};
