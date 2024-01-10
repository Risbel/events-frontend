import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ISignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const credentials: any = getValues();

  const { mutate, isLoading, isError, error } = useSignup(credentials);

  const onSubmit: SubmitHandler<ISignupSchema> = (data) => {
    mutate(data);
  };

  return (
    <AuthLayout>
      <div>
        <Link
          className={`${buttonVariants({
            variant: "outline",
          })} absolute left-6 top-5`}
          href={"/auth/login"}
        >
          <ChevronLeft />
        </Link>
        <p className="text-2xl font-bold text-center py-4">SIGN UP</p>
        <form onSubmit={handleSubmit(onSubmit)} name="signup form" className="flex flex-col gap-4">
          <div className="relative">
            <Label name={"Name"} htmlfor={"name"} />
            <Input autoComplete="off" {...register("name")} id="name" type="text" placeholder="name" />
            {errors.name && <p className="text-start text-xs italic text-red-500">{errors.name.message}</p>}
          </div>
          <div className="relative">
            <Label name={"Last Name"} htmlfor={"lastName"} />
            <Input autoComplete="off" {...register("lastName")} id="lastName" type="text" placeholder="last name" />
            {errors.lastName && <p className="text-start text-xs italic text-red-500">{errors.lastName.message}</p>}
          </div>
          <div className="relative">
            <Label name={"Email"} htmlfor={"email"} />
            <Input autoComplete="off" {...register("email")} id="email" placeholder="email" />
            {errors.email && <p className="text-start text-xs italic text-red-500">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <Label name={"Phone"} htmlfor={"phone"} />
            <Input autoComplete="off" {...register("phone")} id="phone" type="text" placeholder="phone number" />
            {errors.phone && <p className="text-start text-xs italic text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="relative">
            <Label name={"Password"} htmlfor={"password"} />
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
            <Label name={"Confirm Password"} htmlfor={"password"} />
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
          <Button className="flex gap-2" type="submit">
            Sign up {isLoading && <Spinner diameter={4} />}
          </Button>
        </form>
      </div>
      <div className="relative hidden md:flex flex-col text-gray-700">
        <h2 className="absolute left-0 right-0 text-white text-4xl font-bold">My Events</h2>
        <Image
          priority
          className="w-auto"
          src={"/image-auth-hands-tickets.jpg"}
          height={400}
          width={400}
          alt=" image auth hands tickets"
        />
      </div>
    </AuthLayout>
  );
};

export default Signup;

export interface SignupState {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}
