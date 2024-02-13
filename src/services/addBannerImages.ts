import { AddBannerImagesSchema } from "@/components/event/AddBannerImages";
import httpService from "@/config/axios.config";

export const addBannerImages = async (data: AddBannerImagesSchema) => {
  const response = await httpService.post(`/discoBannerImage/${data.discoDetailsId}`, {
    bannerImages: data.bannerImages,
  });
  return response.data;
};
