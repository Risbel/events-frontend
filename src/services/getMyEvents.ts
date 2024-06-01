import httpService from "@/config/axios.config";

export const getMyEvents = async (userId: string | undefined) => {
  const response = await httpService.get<IMyEvents[]>(`/disco/myEvents/${userId}`);
  return response.data;
};

export interface IMyEvents {
  id: string;
  name: string;
  logo: string;
  slug: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  discoDetail: {
    id: string;
    h1Banner: string;
    bannerDescription: string;
    aboutDescription: string;
    titleTextCarousel: string;
    titleTextAbout: string;
    bgImage: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    userBankCardId: string;
    administrator: string;
    discoId: string;
  };
}
