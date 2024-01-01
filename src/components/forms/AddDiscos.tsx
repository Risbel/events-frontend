import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCreateDisco from "@/hooks/useCreateDisco";
import { addDiscoSchema } from "./zodSchemas/addDiscoSchema";
import ButtomSubmit from "../buttons/ButtomSubmit";
import useGetMe from "@/hooks/useGetMe";
import Spinner from "../loaders/Spinner";
import Resource405 from "../alerts/Resource405";
import Link from "next/link";
import { useState } from "react";

export type AddDiscoSchema = z.infer<typeof addDiscoSchema>;

const AddDiscos = () => {
  const [bankCardInput, setBankCardInput] = useState("");
  const [errorBankCard, setErrorBankCard] = useState("");
  const { isLoading: isLoadingMy, user } = useGetMe();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddDiscoSchema>({
    resolver: zodResolver(addDiscoSchema),
  });

  const { submitDataDisco, isLoading } = useCreateDisco();
  const onSubmit: SubmitHandler<AddDiscoSchema> = (data) => {
    if (bankCardInput.length < 19) {
      setErrorBankCard("This field most be at least 16 characters");
      return;
    }
    setErrorBankCard("");
    data.bankCardNumber = bankCardInput;

    submitDataDisco(data);
    reset();
  };

  if (isLoadingMy) {
    return (
      <div className="flex pt-24 justify-center">
        <Spinner diameter={8} />
      </div>
    );
  }

  if (user) {
    if (user.email !== "risbel961019@gmail.com") {
      return (
        <div className="flex flex-col justify-center items-center gap-8 pt-24">
          <Resource405 text={"This resource is just reserved for admins"} />
          <Link className="text-md text-white p-2 bg-purple-600/40 hover:bg-purple-500/40 rounded-lg" href={"/"}>
            Back to home
          </Link>
        </div>
      );
    }
  }

  return (
    <>
      <h1 className="text-2xl text-white font-bold pb-4">Add discos here:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2 md:grid md:grid-cols-2">
          <div className="mb-2 md:mr-2 md:mb-0">
            <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="discoName">
              Disco name
            </label>
            <input
              className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
              id="discoName"
              type="text"
              placeholder="Disco name"
              {...register("name")}
            />
            {errors.name && <p className="text-xs italic text-red-500 mt-2">{errors.name?.message}</p>}
          </div>
          <div className="mb-2">
            <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="slug">
              Slug
            </label>
            <input
              className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
              id="slug"
              type="text"
              placeholder="Slug"
              {...register("slug")}
            />
            {errors.slug && <p className="text-xs italic text-red-500 mt-2">{errors.slug?.message}</p>}
          </div>
        </div>

        <div className="mb-2 md:grid md:grid-cols-2">
          <div className="pb-2">
            <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="administrator">
              Administrator
            </label>
            <input
              className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
              id="administrator"
              type="text"
              placeholder="Administrator"
              {...register("administrator")}
            />
            {errors.administrator && (
              <p className="text-xs italic text-red-500 mt-2">{errors.administrator?.message}</p>
            )}
          </div>
        </div>
        <div className="pb-2">
          <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="description">
            Short description
          </label>
          <textarea
            className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Short description"
            rows={2}
            {...register("description")}
          />
          {errors.description && <p className="text-xs italic text-red-500 mt-2">{errors.description?.message}</p>}
        </div>

        <div className="pb-2">
          <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="largeDescription">
            Large description
          </label>
          <textarea
            className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="largeDescription"
            placeholder="Large description"
            rows={4}
            {...register("largeDescription")}
          />
          {errors.largeDescription && (
            <p className="text-xs italic text-red-500 mt-2">{errors.largeDescription?.message}</p>
          )}
        </div>

        <div className="pb-2">
          <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="address">
            Address
          </label>
          <input
            className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Address"
            {...register("address")}
          />
          {errors.address && <p className="text-xs italic text-red-500 mt-2">{errors.address?.message}</p>}
        </div>

        <div className="pb-2">
          <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="bankCardNumber">
            Bank card number
          </label>
          <input
            className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="bankCardNumber"
            type="text"
            max={16}
            placeholder="Bank card number"
            value={bankCardInput}
            autoComplete="off"
            {...register("bankCardNumber")}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              value = value.replace(/(\d{4})(?=\d)/g, "$1-");
              if (value.length > 20) {
                return;
              }
              setBankCardInput(value);
            }}
          />
          {errorBankCard.length > 5 && <p className="text-xs italic text-red-500 mt-2">{errorBankCard}</p>}
        </div>

        <div className="pb-2">
          <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="logo">
            Logo
          </label>
          <input
            className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="logo"
            type="text"
            placeholder="logo"
            {...register("logo")}
          />
          {errors.logo && <p className="text-xs italic text-red-500 mt-2">{errors.logo?.message}</p>}
        </div>

        <div className="pb-2">
          <label className="block mb-1 text-sm font-medium text-gray-200" htmlFor="background">
            Background Image
          </label>
          <input
            className="w-full py-2 pl-2 text-sm leading-tight text-gray-800 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="background"
            type="text"
            placeholder="Background image"
            {...register("bgImage")}
          />
          {errors.bgImage && <p className="text-xs italic text-red-500 mt-2">{errors.bgImage?.message}</p>}
        </div>

        <div className="my-6 mb-12 text-center">
          <ButtomSubmit isLoading={isLoading} text={"Create new disco"} />
        </div>
      </form>
    </>
  );
};

export default AddDiscos;
