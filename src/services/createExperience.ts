import httpService from "@/config/axios.config";

export const createExperience = async (data: { imageUrl: string; imageText: string; discoDetailId: string }) => {
  const { imageUrl: image, imageText, discoDetailId } = data;

  const response = await httpService.post(`/discoImage/${discoDetailId}`, {
    image,
    imageText,
  });
  return response.data;
};
