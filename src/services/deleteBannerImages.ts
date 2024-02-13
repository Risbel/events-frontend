import httpService from "@/config/axios.config";

export const deleteBannerImages = async (id: string) => {
  const response = await httpService.delete(`/discoBannerImage/${id}`);
  return response.data;
};
