import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useSignup } from "@/hooks/useSignup";
import Link from "next/link";
import Spinner from "@/components/loaders/Spinner";
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

  if (!slug || !data?.disco?.discoDetail?.discoImages) {
    return;
  }

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      <div className="absolute inset-0 -z-30 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <div className="flex items-center gap-8 m-32 p-8 shadow-lg shadow-gray-400 bg-secondary rounded-xl">
        <div className="w-full min-w-[300px] md:min-w-[500px] shadow-md shadow-gray-400 rounded-xl bg-white p-4">
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
          <p className="text-2xl font-bold text-center py-4">SIGN UP</p>
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
            <Button className="flex gap-2 hover:opacity-85" type="submit">
              Sign up
              {isLoading && (
                <Spinner diameter={4} stroke={`${data?.disco.discoDetail.discoColor.buttonsTicketsColor}`} />
              )}
            </Button>
          </form>
        </div>
        {data?.disco?.discoDetail?.discoImages?.length > 0 && (
          <div className="w-full hidden lg:block">
            <Carousel>
              <div className="flex items-center justify-center gap-4 mb-4">
                <Image src={data?.disco.logo} alt="logo" height={40} width={40} className="rounded-full" />
                <p className="text-center text-2xl font-bold">{data?.disco.name}</p>
              </div>

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
                          <Image
                            className="object-cover w-full h-[400px] rounded-2xl"
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
        )}
      </div>
    </div>
  );
};

export default Signup;
