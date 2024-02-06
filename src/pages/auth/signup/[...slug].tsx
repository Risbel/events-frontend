import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useSignup } from "@/hooks/useSignup";
import Link from "next/link";
import Spinner from "@/components/loaders/Spinner";
import AuthLayout from "@/components/layouts/AuthLayout.tsx";
import { ChevronLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import useGetDisco from "@/hooks/useGetDisco";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const signupSchema = z
  .object({
    name: z.string().min(1, { message: "Your name is required" }),
    lastName: z.string().min(1, { message: "Your lastname is required" }),
    email: z.string().min(1, { message: "The email is required" }).email(),
    phone: z.string().min(1, { message: "Your phone is required" }),
    password: z.string().min(1, { message: "The password is required" }),
    confirmPassword: z.string().min(1, { message: "Please, confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ISignupSchema = z.infer<typeof signupSchema>;

const Signup = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isRePassword, setIsRePassword] = useState(false);
  const params = useParams();
  const slug: any = params?.slug?.[1];
  const { data } = useGetDisco({ slug });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ISignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const credentials: any = getValues();

  const { mutate, isLoading, isError, error } = useSignup(credentials, slug);

  const onSubmit: SubmitHandler<ISignupSchema> = (data) => {
    mutate(data);
  };

  if (!slug) {
    return;
  }

  return (
    <div
      style={{ background: data?.disco.discoDetail.discoColor.bgTicketsSection }}
      className="relative flex justify-center items-center h-screen"
    >
      <div
        style={{
          border: `solid 2px ${data?.disco.discoDetail.discoColor.buttonTicketForeground}`,
          background: data?.disco.discoDetail.discoColor.buttonsTicketsColor,
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between text-center md:justify-around absolute rounded-xl md:rounded-3xl shadow-md shadow-black/10 px-4 py-4 md:py-12 w-full md:w-5/6 lg:w-8/12"
      >
        <div className=" overflow-y-hidden">
          <Link
            style={{
              color: data?.disco.discoDetail.discoColor.buttonTicketForeground,
              border: `solid 2px ${data?.disco.discoDetail.discoColor.buttonTicketForeground}`,
              background: data?.disco.discoDetail.discoColor.buttonsTicketsColor,
            }}
            className={"absolute left-6 top-5 rounded-md hover:opacity-80 hover:-translate-y-0.5 transition-transform"}
            href={`/auth/login/event/${slug}`}
          >
            <ChevronLeft />
          </Link>
          <p
            style={{ color: data?.disco.discoDetail.discoColor.buttonTicketForeground }}
            className="text-2xl font-bold text-center py-4"
          >
            SIGN UP
          </p>
          <form onSubmit={handleSubmit(onSubmit)} name="signup form" className="flex flex-col gap-6">
            <div className="relative">
              <Label className={"text-xs md:text-xs border border-b-0"} name={"Name"} htmlfor={"name"} />
              <Input autoComplete="off" {...register("name")} id="name" type="text" placeholder="name" />
              {errors.name && <p className="text-start text-xs italic text-red-500">{errors.name.message}</p>}
            </div>
            <div className="relative">
              <Label className={"text-xs md:text-xs border border-b-0"} name={"Last Name"} htmlfor={"lastName"} />
              <Input autoComplete="off" {...register("lastName")} id="lastName" type="text" placeholder="last name" />
              {errors.lastName && <p className="text-start text-xs italic text-red-500">{errors.lastName.message}</p>}
            </div>
            <div className="relative">
              <Label className={"text-xs md:text-xs border border-b-0"} name={"Email"} htmlfor={"email"} />
              <Input autoComplete="off" {...register("email")} id="email" placeholder="email" />
              {errors.email && <p className="text-start text-xs italic text-red-500">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <Label className={"text-xs md:text-xs border border-b-0"} name={"Phone"} htmlfor={"phone"} />
              <Input autoComplete="off" {...register("phone")} id="phone" type="text" placeholder="phone number" />
              {errors.phone && <p className="text-start text-xs italic text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="relative">
              <Label className={"text-xs md:text-xs border border-b-0"} name={"Password"} htmlfor={"password"} />
              <Input
                autoComplete="off"
                {...register("password")}
                id="password"
                type={isPassword ? "text" : "password"}
                placeholder="password"
              />
              <button
                type="button"
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setIsPassword((prev) => !prev)}
              >
                {isPassword ? <EyeIcon className="stroke-gray-700" /> : <EyeOffIcon className="stroke-gray-700" />}
              </button>
              {errors.password && <p className="text-start text-xs italic text-red-500">{errors.password.message}</p>}
            </div>
            <div className="relative">
              <Label
                className={"text-xs md:text-xs border border-b-0"}
                name={"Confirm Password"}
                htmlfor={"password"}
              />
              <Input
                autoComplete="off"
                {...register("confirmPassword")}
                id="confirmPassword"
                type={isRePassword ? "text" : "password"}
                placeholder="confirm password"
              />
              <button
                type="button"
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setIsRePassword((prev) => !prev)}
              >
                {isRePassword ? <EyeIcon className="stroke-gray-700" /> : <EyeOffIcon className="stroke-gray-700" />}
              </button>
              {errors.confirmPassword && (
                <p className="text-start text-xs italic text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            {isError && <p className="text-center text-xs italic text-red-500">{error?.response?.data?.message}</p>}
            <Button
              style={{
                background: data?.disco.discoDetail.discoColor.buttonTicketForeground,
                color: data?.disco.discoDetail.discoColor.buttonsTicketsColor,
              }}
              className="flex gap-2 hover:opacity-85"
              type="submit"
            >
              Sign up
              {isLoading && (
                <Spinner diameter={4} stroke={`${data?.disco.discoDetail.discoColor.buttonsTicketsColor}`} />
              )}
            </Button>
          </form>
        </div>
        <div className="relative hidden md:flex flex-col items-center justify-center">
          <Carousel>
            <CarouselContent>
              {data?.disco.discoDetail?.discoImages?.map(
                (discoImage, index) =>
                  discoImage && (
                    <CarouselItem key={index}>
                      <div
                        style={{
                          borderRadius: "20px",
                          border: `solid 3px`,
                          borderColor: `${data.disco.discoDetail.discoColor.textAboutColor}`,
                        }}
                        className="relative overflow-hidden"
                      >
                        <p className="bg-gradient-to-t from-black via-black/60 to-transparent  absolute text-center w-full text-white text-xs md:text-md font-light bottom-0">
                          {discoImage?.imageText}
                        </p>
                        <Image
                          className="object-cover w-full max-h-[400px] rounded-2xl"
                          src={discoImage.image}
                          width={400}
                          height={400}
                          alt={`experiencie${discoImage.id}`}
                        />
                      </div>
                    </CarouselItem>
                  )
              )}
            </CarouselContent>
            <CarouselPrevious className="flex translate-x-4" />
            <CarouselNext className="flex -translate-x-4" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Signup;
