import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/signup";
import { signIn } from "next-auth/react";

export const useSignup: any = (credentials: { password: string; email: string }) => {
  const { email, password } = credentials;

  return useMutation({
    mutationFn: signup,
    onSuccess: async (resp) => {
      if (resp.status) {
        const status = await signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard",
        });
      }
    },
  });
};
