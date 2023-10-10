import httpService from "@/config/axios.config";

export const signup = async (personalDates) => {
  try {
    const res = await httpService.post("/signup", personalDates, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
