'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import ButtomDiscart from '../buttons/ButtonDiscart'
import ButtomSubmit from '../buttons/ButtomSubmit'
import { zodResolver } from '@hookform/resolvers/zod'
import useCreateDiscoRoles from '@/hooks/useCreateDiscoRoles'

const addRolesSchema = z.object({
  name: z.string().min(1, { message: 'This field is require' }),
  discoId: z.string().optional(),
})

export type AddRoleSchema = z.infer<typeof addRolesSchema>

const AddRolesForm = ({
  discoId,
  setIsActiveForm,
}: {
  discoId: string
  setIsActiveForm: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddRoleSchema>({
    resolver: zodResolver(addRolesSchema),
  })

  const { isLoading, submitDiscoRole, isSuccess } = useCreateDiscoRoles()

  const onSubmit: SubmitHandler<AddRoleSchema> = data => {
    data.discoId = discoId
    submitDiscoRole(data)
    isSuccess && reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          className="block mb-1 text-sm font-medium text-gray-200"
          htmlFor="name"
        >
          Role name
        </label>
        <input
          className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Role name"
          id="name"
          type="text"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.name.message}
          </p>
        )}
        <div className="flex gap-2 py-4">
          <ButtomSubmit text="Add" isLoading={isLoading} />
          <ButtomDiscart text="Discart" setIsActiveForm={setIsActiveForm} />
        </div>
      </div>
    </form>
  )
}

export default AddRolesForm
