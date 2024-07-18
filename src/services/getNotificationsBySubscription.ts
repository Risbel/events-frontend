import httpService from "@/config/axios.config";

export const getNotificationsBySubscription = async (
  userId: string | undefined,
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  const response = await httpService.get(`/notifications/subscription/${userId}`, {
    params: {
      page,
      limit,
      search,
    },
  });
  return response.data;
};
