import httpService from "@/config/axios.config";

export const createSubscription = async ({ userId, discoId }: { userId: string; discoId: string }) => {
  try {
    const resp = await httpService.post(`/subscription/${userId}`, { discoId });
    return resp.data;
  } catch (error) {
    return error.message;
  }
};
