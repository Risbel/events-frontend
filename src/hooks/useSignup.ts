import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/signup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useSignup: any = ({ password, email }: { password: string; email: string }) => {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: async (resp) => {
      if (resp.status) {
        const status = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/",
        });

        if (status?.url) {
          router.push(status.url);
        }
      }
    },
  });
};
