import Spinner from "@/components/loaders/Spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useGetDisco from "@/hooks/useGetDisco";
import useLogin from "@/hooks/useLogin";
import useCart from "@/store/useCart";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigRight, CheckCircle2, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  const params = useParams();
  const slug = params?.slug?.[1];
  const cart = useCart();
  const { status } = useSession();

  const { mutate, isLoading, data, isSuccess } = useLogin();
  const { data: dataDisco } = useGetDisco({ slug });

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
    if (isSuccess && data?.ok && dataDisco?.disco && !hasNavigated.current && status === "authenticated") {
      hasNavigated.current = true;
      if (cart?.cartItems?.length) {
        router.push(`/event/${slug}/cart`);
      } else {
        router.push(`/event/${slug}`);
      }
    }
  }, [isSuccess, data?.ok, dataDisco?.disco, cart?.cartItems?.length, slug, router, status]);

  if (!slug || !dataDisco) {
    return;
  }

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      <div className="absolute inset-0 -z-30 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

      <div className="flex justify-center min-w-[300px] md:min-w-[500px] gap-4 p-8 rounded-xl bg-white border shadow-xl w-1/3">
        <div
          style={{ background: dataDisco?.disco.discoDetail.discoColor.buttonTicketForeground }}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex justify-center gap-4">
            {dataDisco?.disco.logo && (
              <Image src={dataDisco?.disco.logo} alt="logo" height={40} width={40} className="rounded-full" />
            )}
            <h1 className="text-3xl font-semibold text-center">{slug.toUpperCase()}</h1>
          </div>

          <div className="pb-2">
            <p className="text-center font-light text-md leading-4">
              <span className="text-destructive/80 font-semibold">Login</span> to access
              <Link href={slug ? `/auth/signup/event/${slug}` : "/auth/signup"}>
                {" "}
                {"or "}
                <span className="text-destructive/80 font-semibold hover:underline">Sign Up</span>
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} name="login form" className="flex flex-col gap-4">
            <input type="text" hidden {...register("disco")} defaultValue={slug} />
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
              <Link
                className="flex gap-2 justify-center bg-primary p-2 rounded-lg hover:opacity-90"
                href={cart?.cartItems?.length ? `/event/${slug}/cart` : `/event/${slug}`}
              >
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
