import httpService from "@/config/axios.config";

export const deleteCarouselImage = async (id: string) => {
  const response = await httpService.delete(`/carouselImages/${id}`);
  return response.data;
};
