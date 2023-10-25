import httpService from "@/config/axios.config";

export const deleteDiscoTicket = async (ticketId: string) => {
  const response = await httpService.delete(`/discoTicket/${ticketId}`);
  return response.data;
};
