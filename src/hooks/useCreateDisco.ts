import { createDisco } from '@/services/createDisco'
import { useMutation } from '@tanstack/react-query'

const useCreateDisco = () => {
  const {
    mutate: submitDataDisco,
    isLoading,
    isSuccess,
    status,
  } = useMutation({
    mutationFn: data => createDisco(data),
  })

  return { submitDataDisco, isLoading, isSuccess, status }
}

export default useCreateDisco
