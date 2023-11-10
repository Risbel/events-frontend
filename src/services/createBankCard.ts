import httpService from "@/config/axios.config";
import { AddNewCardSchema } from "@/pages/profile/components/FormAddNewCard";

export const createBankCard = async (data: AddNewCardSchema) => {
  const response = await httpService.post(`/userBankCard`, data);
  return response.data;
};
