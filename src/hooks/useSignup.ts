import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/signup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCart from "@/store/useCart";

export const useSignup: any = (credentials: { password: string; email: string }, slug: string) => {
  const router = useRouter();
  const cart = useCart();

  const { email, password } = credentials;

  return useMutation({
    mutationFn: signup,
    onSuccess: async (resp) => {
      if (resp.status) {
        const status = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl:
            slug && cart.cartItems.length ? `/event/${slug}/cart` : slug ? `/event/${slug}` : `/dashboard/allevents`,
        });

        if (status?.url) {
          router.push(status.url);
        }
      }
    },
  });
};
