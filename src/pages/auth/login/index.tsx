import AuthLayout from "@/components/layouts/AuthLayout.tsx";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useLogin from "@/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigRight, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "The email is required" }).email(),
  password: z.string().min(1, { message: "The password is required" }),
  disco: z.string().optional(),
});

export type ILoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const hasNavigated = useRef(false);
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(false);

  const { mutate, isLoading, data, isSuccess } = useLogin();
  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILoginSchema> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess && data?.ok && !hasNavigated.current && status === "authenticated") {
      hasNavigated.current = true;
      router.push("/dashboard/allevents");
    }
  }, [isSuccess, data, router, status]);

  return (
    <AuthLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-center md:text-start">My Events</h1>
        <div className="pb-2">
          <p className="text-start font-light text-md leading-4">
            <span className="text-destructive/80 font-semibold">Login</span> to access or{" "}
            <Link href={"/auth/signup"}>
              <span className="text-destructive/80 font-semibold hover:underline">Sign Up</span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} name="login form" className="flex flex-col gap-4">
          <div className="relative">
            <Label name={"Email"} htmlfor={"email"} />
            <Input {...register("email")} autoComplete="none" id="email" type="email" placeholder="Email" />
            {errors.email && <p className="text-start text-xs italic text-red-500">{errors.email.message}</p>}
          </div>
          <div className="relative z-20">
            <Label name={"Password"} htmlfor={"password"} />
            <Input
              {...register("password")}
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
          {data?.status === 401 && <p className="text-center text-xs italic text-red-500">Invalid credentials</p>}

          {isSuccess ? (
            <Link className="flex gap-2 justify-center bg-primary p-2 rounded-lg" href={"/dashboard/allevents"}>
              <span className="text-white">Get started</span> <ArrowBigRight className="stroke-white" />
            </Link>
          ) : (
            <Button className="flex items-center gap-2" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          )}

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
      <div className="relative hidden md:flex flex-col items-center justify-center rounded-3xl overflow-hidden">
        <div style={{ background: "rgba(0, 0, 0, 0.5)" }} className="absolute h-full w-full rounded-[30px]"></div>
        <Image className="absolute" src={"/MyEvents-logo.svg"} alt="MyEvents logo" width={350} height={350} />

        <Image
          priority
          src={"/image-auth-hands-tickets.jpg"}
          height={500}
          width={500}
          alt=" image auth hands tickets"
        />
      </div>
    </AuthLayout>
  );
};

export default Login;
