import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/signup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignupState } from "@/pages/auth/signup";

export const useSubmitSignup = (password: string, email: string) => {
  const router = useRouter();

  const {
    mutate: submitPersonalDates,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (personalDates: SignupState) => signup(personalDates),
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

  return { submitPersonalDates, isLoading, isSuccess };
};
