import axios from "axios";
import { getSession } from "next-auth/react";

const httpService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_SERVER,
  withCredentials: true,
});

httpService.interceptors.request.use(async (config) => {
  const session = await getSession();

  config.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
  return config;
});

export default httpService;
