import { AddExperiencieSchema } from "@/components/forms/AddExperiencesForm";
import httpService from "@/config/axios.config";

export const createExperience = async (data: AddExperiencieSchema) => {
  const { imageUrl: image, imageText, discoDetailId } = data;

  const response = await httpService.post(`/discoImage/${discoDetailId}`, {
    image,
    imageText,
  });
  return response.data;
};
