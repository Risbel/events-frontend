import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string; disco?: string }) => {
      if (!data) {
        return;
      }

      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });

      return response;
    },
  });
};

export default useLogin;
