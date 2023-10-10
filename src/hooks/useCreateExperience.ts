import { createExperience } from '@/services/createExperience'
import { useMutation } from '@tanstack/react-query'

export const useCreateExperience = () => {
  const {
    isLoading,
    isSuccess,
    mutate: submitDataExperience,
  } = useMutation({
    mutationFn: data => createExperience(data),
  })

  return { isLoading, isSuccess, submitDataExperience }
}
