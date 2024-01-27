import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ButtomSubmit from "../buttons/ButtonSubmit";
import ButtomDiscart from "../buttons/ButtonDiscart";
import { useCreateExperience } from "@/hooks/useCreateExperience";

const addExperienceSchema = z.object({
  imageUrl: z.string().min(1, { message: "This field is required" }),
  imageText: z.string().min(1, { message: "This field is required" }),
  discoDetailId: z.string().min(1),
});

export type AddExperiencieSchema = z.infer<typeof addExperienceSchema>;

const AddExperiencesForm = ({
  discoDetailId,
  setIsActiveForm,
}: {
  discoDetailId: string;
  setIsActiveForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddExperiencieSchema>({
    resolver: zodResolver(addExperienceSchema),
  });

  const { isLoading, submitDataExperience } = useCreateExperience();

  const onSubmit: SubmitHandler<AddExperiencieSchema> = (data) => {
    submitDataExperience(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="imageUrl">
          Image URL
        </label>
        <input
          className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Image URL"
          id="imageUrl"
          type="text"
          {...register("imageUrl")}
        />
        {errors.imageUrl && <p className="text-xs italic text-red-500 mt-2">{errors.imageUrl?.message}</p>}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="imageText">
          Image text
        </label>
        <input
          className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Image text"
          id="imageText"
          type="text"
          {...register("imageText")}
        />
        {errors.imageText && <p className="text-xs italic text-red-500 mt-2">{errors.imageText?.message}</p>}
      </div>
      <input type="text" hidden defaultValue={discoDetailId} {...register("discoDetailId")} id="discoDetailId" />
      <div className="my-6 mb-12 text-center flex gap-4">
        <ButtomSubmit isLoading={isLoading} text={"Create new experience"} />
        <ButtomDiscart setIsActiveForm={setIsActiveForm} text={"Discart experience"} />
      </div>
    </form>
  );
};

export default AddExperiencesForm;
