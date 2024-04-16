import { createDisco } from "@/services/createDisco";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useCreateDisco = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createDisco,
    onSuccess: () => router.push("/dashboard/allevents"),
  });
};

export default useCreateDisco;
