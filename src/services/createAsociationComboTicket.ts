import httpService from "@/config/axios.config";

export const createAsociationComboTicket = async ({
  discoTicketId,
  comboId,
}: {
  discoTicketId: string;
  comboId: string;
}) => {
  const response = await httpService.post(`/combo/asociate/${discoTicketId}`, { comboId: comboId });
  return response.data;
};
