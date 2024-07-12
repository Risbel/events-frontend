import { loginCredentials } from "@/services/loginCredentials";
import useCart from "@/store/useCart";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogin = (disco?: string) => {
  const cart = useCart();
  const router = useRouter();
  return useMutation({
    mutationFn: loginCredentials,
    onSuccess: (status) => {
      if (status === 200 && disco) {
        cart.cartItems.length ? router.push(`/event/${disco}/cart`) : router.push(`/event/${disco}`);
      } else {
        console.log(status);

        router.push("/dashboard/allevents");
      }
    },
  });
};

export default useLogin;
