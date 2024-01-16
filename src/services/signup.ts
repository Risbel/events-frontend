import httpService from "@/config/axios.config";

export const signup = async (personalDates: SignupState) => {
  const res = await httpService.post("/signup", personalDates, {
    withCredentials: true,
  });

  return res.data;
};
export interface SignupState {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}
