import httpService from "@/config/axios.config";
import { getSession } from "next-auth/react";

export const refreshToken = async () => {
  try {
    const session = await getSession();

    const response = await httpService.post("/refresh", {
      refresh: session?.user?.refreshToken,
    });

    return response.data.accessToken;
  } catch (error: any) {
    return error.message;
  }
};
