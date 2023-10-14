import useGetUserByToken from "./useGetUserByToken";

const useGetMe = (): UseGetMeResult => {
  const { data: user, error, isLoading } = useGetUserByToken();

  return {
    user,
    error,
    isLoading,
  };
};

export default useGetMe;

export interface UseGetMeResult {
  user: IMyself;
  error: unknown;
  isLoading: boolean;
}
export interface IMyself {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  imageUrl: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
