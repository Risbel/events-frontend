import httpService from "@/config/axios.config";

export const generateColors = async (brandColor: string) => {
  const response = await httpService.post("/aiText/colorGenerator", { brandColor: brandColor });
  return response.data;
};
