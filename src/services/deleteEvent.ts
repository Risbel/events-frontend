import httpService from "@/config/axios.config";

export const deleteEvent = async (id: string) => {
  const response = await httpService.delete(`/disco/${id}`);
  return response.data;
};
