import { useSession } from 'next-auth/react'
import useGetUser from './useGetUser'

const useGetMe = (): UseGetMeResult => {
  const { data: session } = useSession()

  const {
    data: user,
    error,
    isLoading,
  } = useGetUser(session?.user?.accessToken)

  return {
    user,
    error,
    isLoading,
  }
}

export default useGetMe

export interface IMyself {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  password: string
  imageUrl: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface UseGetMeResult {
  user: IMyself
  error: unknown
  isLoading: boolean
}
