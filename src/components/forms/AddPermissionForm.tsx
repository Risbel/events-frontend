import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ButtomDiscart from "../buttons/ButtonDiscart";
import ButtomSubmit from "../buttons/ButtonSubmit";
import useGetPermissions from "@/hooks/useGetPermissions";
import useCreatePermission from "@/hooks/useCreatePermission";
import useGetResources from "@/hooks/useGetResources";

const addPermissionsSchema = z.object({
  permission: z.string().min(1, { message: "Please select an permission" }),
  resource: z.string().min(1, { message: "Please select an resource" }),
  roleId: z.string().optional(),
});

export type AddPermissionsSchema = z.infer<typeof addPermissionsSchema>;

const AddPermissionForm = ({
  roleId,
  setIsActiveForm,
}: {
  roleId: string;
  setIsActiveForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: permissions } = useGetPermissions();

  const { data: resources } = useGetResources();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddPermissionsSchema>({
    resolver: zodResolver(addPermissionsSchema),
  });

  const { mutate: submitPermission, isLoading: isLoadingCreatePermission } = useCreatePermission();

  const onSubmit: SubmitHandler<AddPermissionsSchema> = (data) => {
    data.roleId = roleId;
    submitPermission(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 items-center">
        <div className="flex gap-2">
          <div>
            <select
              defaultValue={""}
              className="w-40 h-8 text-white bg-white/10 rounded-md"
              id="permission"
              {...register("permission")}
            >
              <option value="" disabled hidden>
                Select a permission
              </option>

              {permissions &&
                permissions.map((permission) => (
                  <option key={permission.id} className="bg-black/70" value={permission.id}>
                    {permission.name}
                  </option>
                ))}
            </select>
            {errors.permission && <p className="text-xs italic text-red-500 mt-2">{errors.permission.message}</p>}
          </div>
          <div>
            <select
              defaultValue={""}
              className="w-40 h-8 text-white bg-white/10 rounded-md"
              id="resource"
              {...register("resource")}
            >
              <option value="" disabled hidden>
                Select a resource
              </option>

              {resources &&
                resources.map((resource) => (
                  <option key={resource.id} className="bg-black/70" value={resource.id}>
                    {resource.name}
                  </option>
                ))}
            </select>
            {errors.resource && <p className="text-xs italic text-red-500 mt-2">{errors.resource.message}</p>}
          </div>
        </div>

        <div className="flex gap-2">
          <ButtomSubmit isLoading={isLoadingCreatePermission} text={"add"} />
          <ButtomDiscart setIsActiveForm={setIsActiveForm} text={"discart"} />
        </div>
      </div>
    </form>
  );
};

export default AddPermissionForm;
