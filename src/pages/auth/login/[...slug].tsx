import AuthLayout from "@/components/layouts/AuthLayout.tsx";
import Spinner from "@/components/loaders/Spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useGetDisco from "@/hooks/useGetDisco";
import useLogin from "@/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  const [isPassword, setIsPassword] = useState(false);
  const params = useParams();
  const slug = params?.slug?.[1];

  const { mutate, isLoading, data: status } = useLogin(slug);
  const { data } = useGetDisco({ slug });

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

  if (!slug) {
    return;
  }

  return (
    <div
      style={{ background: data?.disco.discoDetail.discoColor.bgTicketsSection }}
      className="flex justify-center items-center h-screen"
    >
      <div className="flex gap-4 p-8 rounded-xl bg-white shadow-xl">
        <div
          style={{ background: data?.disco.discoDetail.discoColor.buttonTicketForeground }}
          className="flex flex-col gap-4"
        >
          <h1 className="text-3xl font-semibold text-center">{slug.toUpperCase()}</h1>
          <div className="pb-2">
            <p className="text-start font-light text-md leading-4">
              <span className="text-destructive/80 font-semibold">Login</span> to access to{" "}
              <span className="font-semibold">{slug ? slug.toUpperCase() : "MyEvents"}</span> or{" "}
              <Link href={slug ? `/auth/signup/event/${slug}` : "/auth/signup"}>
                <span className="text-destructive/80 font-semibold hover:underline">Sign Up</span>
              </Link>
              if you don&apos;t have an acount.
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
            {status === 401 && <p className="text-center text-xs italic text-red-500">Invalid credentials</p>}

            <Button
              style={{
                background: data?.disco.discoDetail.discoColor.bgNavbarColor,
                color: data?.disco.discoDetail.discoColor.navbarForeground,
              }}
              className="flex gap-2 shadow-md hover:opacity-90"
              type="submit"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>

            <div className="flex justify-center items-center gap-2 w-full overflow-hidden text-black">
              <Separator className="w-full" />
              <span>or</span>
              <Separator className="w-full" />
            </div>

            <Link
              className={`${buttonVariants({ variant: "outline" })} font-sans`}
              href={slug ? `/auth/signup/event/${slug}` : "/auth/signup"}
            >
              CREATE NEW ACOUNT
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
