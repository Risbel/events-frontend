import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 60 * 1000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      retry: false,
    },
  },
});
export default queryClient;
