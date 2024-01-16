import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/signup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useSignup: any = (credentials: { password: string; email: string }, disco: string) => {
  const router = useRouter();

  const { email, password } = credentials;

  return useMutation({
    mutationFn: signup,
    onSuccess: async (resp) => {
      if (resp.status) {
        const status = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: `/disco/${disco}`,
        });

        if (status?.url) {
          router.push(status.url);
        }
      }
    },
  });
};
