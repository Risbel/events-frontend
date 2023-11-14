import { getUserById } from "@/services/getUserById";
import { useQuery } from "@tanstack/react-query";

const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["userById", id],
    queryFn: () => getUserById(id),
  });
};

export default useGetUserById;
