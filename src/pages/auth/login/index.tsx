import AuthLayout from "@/components/layouts/AuthLayout.tsx";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useLogin from "@/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigRight, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "The email is required" }).email(),
  password: z.string().min(1, { message: "The password is required" }),
  disco: z.string().optional(),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
const Login = () => {
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const { mutate, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILoginSchema> = (data) => {
    mutate(data);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-center md:text-start">My Events</h1>
        <div className="pb-2">
          <p className="text-start font-light text-md leading-4">
            <span className="text-destructive/80 font-semibold">Login</span> to access or
            <Link href={"/auth/signup"}>
              <span className="text-destructive/80 font-semibold hover:underline"> Sign Up</span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="relative">
            <Label name={"Email"} htmlfor={"email"} />
            <Input
              {...register("email")}
              autoComplete="none"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
            />
            {errors.email && <p className="text-start text-xs italic text-red-500">{errors.email.message}</p>}
          </div>
          <div className="relative z-20">
            <Label name={"Password"} htmlfor={"password"} />
            <Input
              {...register("password")}
              name="password"
              id="password"
              autoComplete="none"
              type={isPassword ? "text" : "password"}
              placeholder="Password"
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
          {error === "CredentialsSignin" && (
            <p className="text-center text-xs italic text-red-500">Invalid credentials</p>
          )}
          <Button className="flex items-center gap-2" type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>

          <div className="flex justify-center items-center gap-2 w-full overflow-hidden text-black">
            <Separator className="w-full" />
            <span>or</span>
            <Separator className="w-full" />
          </div>

          <Link className={`${buttonVariants({ variant: "outline" })} font-sans`} href={"/auth/signup"}>
            CREATE NEW ACOUNT
          </Link>
        </form>
      </div>
      <div className="relative hidden md:flex flex-col items-center justify-center overflow-hidden">
        <Image
          className="absolute z-50 backdrop-blur-[2px] rounded-full"
          src={"/MyEvents-logo.svg"}
          alt="MyEvents logo"
          width={350}
          height={350}
        />
        <Image
          className="rounded-[30px] h-full object-cover brightness-75"
          priority
          src={"/image-auth-hands-tickets.jpg"}
          height={500}
          width={500}
          alt="image auth hands tickets"
        />
      </div>
    </AuthLayout>
  );
};

export default Login;
