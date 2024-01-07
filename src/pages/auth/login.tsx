import AuthLayout from "@/components/layouts/AuthLayout.tsx";
import Spinner from "@/components/loaders/Spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSubmitCredentials } from "@/hooks/useSubmitCredentials";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [isPassword, setIsPassword] = useState(false);
  const { handleChange, credentials, isLoading, error, onSubmitWithCredentials } = useSubmitCredentials({
    email: "",
    password: "",
  });

  return (
    <AuthLayout>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-4xl font-semibold text-start px-4">LOGIN</h1>
        <div className="pb-2">
          <p className="text-start font-light text-md leading-4 px-4">
            <span className="text-destructive/80 font-semibold">Login</span> to access to{" "}
            <span className="font-semibold">MyEvents</span> or{" "}
            <Link href={"/auth/signup"}>
              <span className="text-destructive/80 font-semibold hover:underline">Sign Up</span>
            </Link>{" "}
            if you don&apos;t have an acount.
          </p>
        </div>
        <form onSubmit={onSubmitWithCredentials} name="login form" className="flex flex-col gap-4 p-4">
          <div className="relative">
            <Label name={"Email"} htmlfor={"email"} />
            <Input
              required
              name="email"
              onChange={handleChange}
              value={credentials.email}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="relative z-20">
            <Label name={"Password"} htmlfor={"password"} />
            <Input
              required
              name="password"
              onChange={handleChange}
              value={credentials.password}
              type={isPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="on"
            />
            <button
              type="button"
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setIsPassword((prev) => !prev)}
            >
              {isPassword ? <EyeIcon className="stroke-gray-700" /> : <EyeOffIcon className="stroke-gray-700" />}
            </button>
          </div>
          <Button className="flex gap-2" type="submit">
            Login{" "}
            {isLoading && (
              <div>
                <Spinner diameter={4} />
              </div>
            )}
          </Button>
          {<span className="text-red-600 text-center">{error}</span>}

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

export default Login;
