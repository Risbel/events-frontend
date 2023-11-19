import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { refreshToken } from "./utils/refreshToken";

const httpService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_SERVER,
  withCredentials: true,
});

httpService.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      return signOut();
    }
    const session = await getSession();
    const prevRequest = error.config;
    if (error.response.status === 401 && !prevRequest.sent) {
      prevRequest.sent = true;

      const accessToken = await refreshToken();

      if (session && accessToken) {
        session.user.accessToken = accessToken;
      }

      prevRequest.headers.Authorization = `Bearer ${session?.user.accessToken}`;

      return httpService(prevRequest);
    }

    return Promise.reject(error);
  }
);

export default httpService;
