import httpService from "@/config/axios.config";

export const createSubscription = async ({
  userId,
  discoId,
}: {
  userId: string;
  discoId: string;
}): Promise<ISubscription[]> => {
  try {
    const resp = await httpService.post<ISubscription[]>(`/subscription/${userId}`, { discoId });

    return resp.data;
  } catch (error: any) {
    return error.message;
  }
};

export interface ISubscription {
  id: string;
  discoId: string;
  userId: string;
  roleId: string;
  updatedAt: string;
  createdAt: string;
}
