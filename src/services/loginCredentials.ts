import { signIn } from "next-auth/react";

export const loginCredentials = async (data: { email: string; password: string; disco?: string }) => {
  if (!data) {
    return;
  }
  const response = await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
  });
  return response;
};
