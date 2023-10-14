import { getUserById } from "@/services/getUserById";
import { useQuery } from "@tanstack/react-query";

const useGetUserById = (id: string) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["userById", id],
    queryFn: () => getUserById(id),
  });

  return { isLoading, data, isError, error };
};

export default useGetUserById;
