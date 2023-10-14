import getUsers, { Iuser } from "@/services/getUsers";
import { useQuery } from "@tanstack/react-query";

const useGetUsers = () => {
  const { isLoading, isFetched, isError, error, data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getUsers(),
  });

  return { isLoading, isFetched, isError, error, data };
};

export default useGetUsers;
