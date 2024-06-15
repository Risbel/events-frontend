import httpService from "@/config/axios.config";

export const createCarouselImages = async (formData: any) => {
  const response = await httpService.post(`/carouselImages`, formData);
  return response.data;
};
