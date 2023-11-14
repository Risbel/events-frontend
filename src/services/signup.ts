import httpService from "@/config/axios.config";
import { SignupState } from "@/pages/auth/signup";

export const signup = async (personalDates: SignupState) => {
  const res = await httpService.post("/signup", personalDates, {
    withCredentials: true,
  });

  return res.data;
};
