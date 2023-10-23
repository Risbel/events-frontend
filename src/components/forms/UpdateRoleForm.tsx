import { useState } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useUpdateSubscription from "@/hooks/useUpdateSubscription";
import { useGetRolesByIdDisco } from "@/hooks/useGetRolesByIdDisco";
import Spinner from "../loaders/Spinner";

const roleSchema = z.object({
  idSubscription: z.string().optional(),
  role: z.string().min(1, { message: "Please select at least one role" }),
});

export type RoleSchema = z.infer<typeof roleSchema>;

const UpdateRoleForm = ({ discoId, idSubscription }: { discoId: string; idSubscription: string }) => {
  const [isActiveForm, setIsActiveForm] = useState(false);
  const { isLoading: isLoadingRoles, data } = useGetRolesByIdDisco(discoId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleSchema>({ resolver: zodResolver(roleSchema) });

  const { isLoading, mutate } = useUpdateSubscription();

  const onSubmit: SubmitHandler<RoleSchema> = (data) => {
    if (idSubscription) {
      data.idSubscription = idSubscription;
    } else {
      return;
    }

    mutate(data);
  };

  return (
    <div className="">
      <Button
        onClick={() => setIsActiveForm((prev) => !prev)}
        className={clsx("h-8", isActiveForm && "bg-yellow-600/60 hover:bg-yellow-600/80")}
      >
        {isActiveForm ? "discart" : "edit"}
      </Button>
      <div
        className={clsx(
          !isActiveForm && "hidden",
          "absolute -translate-x-20 bg-blue-950/40 backdrop-blur-xl rounded-md pt-3"
        )}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 pl-2 text-xs font-medium text-gray-200" htmlFor="role">
              select a role
            </label>
            <select
              defaultValue={""}
              className="w-40 h-8 pl-2 text-black bg-white rounded-md"
              id="role"
              {...register("role")}
            >
              <option value="" disabled hidden>
                select a role
              </option>

              {data?.DiscoRoles.map((role) => {
                return (
                  <option value={role.id} key={role.id} className="bg-black/10">
                    {role.name}
                  </option>
                );
              })}
            </select>
            {errors.role && <p className="text-xs italic text-red-500 mt-2">{errors.role.message}</p>}
          </div>
          <Button type="submit" className="flex items-center gap-2 h-8 my-1">
            Send
            {isLoading && <Spinner diameter={3} />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoleForm;
