import httpService from "@/config/axios.config";

export const getBannerImages = async (discoDetailsId: string) => {
  const response = await httpService.get<IBannerImages[]>(`/discoBannerImage/${discoDetailsId}`);
  return response.data;
};

export interface IBannerImages {
  id: string;
  image: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
  discoDetailId: string;
}
