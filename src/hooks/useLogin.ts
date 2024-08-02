import { loginCredentials } from "@/services/loginCredentials";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string; disco?: string }) => loginCredentials(data),
  });
};

export default useLogin;
