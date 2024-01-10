import { loginCredentials } from "@/services/loginCredentials";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginCredentials,
    onSuccess: (status) => {
      if (status === 200) {
        router.push("/");
      }
    },
  });
};

export default useLogin;
