import httpService from "@/config/axios.config";

export const addBannerImages = async (formData: any) => {
  const response = await httpService.post(`/discoBannerImage`, formData);
  return response.data;
};
