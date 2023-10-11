import AuthLayout from "@/components/layouts/AuthLayout.tsx";
import Spinner from "@/components/loaders/Spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSubmitCredentials } from "@/hooks/useSubmitCredentials";
import Link from "next/link";

const Login = () => {
  const { handleChange, credentials, isLoading, error, onSubmitWithCredentials } = useSubmitCredentials({
    email: "",
    password: "",
  });

  return (
    <AuthLayout>
      <p className="text-2xl font-bold text-white text-center pb-4">Login</p>
      <form
        onSubmit={onSubmitWithCredentials}
        name="login form"
        className="flex flex-col gap-4 border p-4  bg-slate-200/20 backdrop-blur-2xl "
      >
        <Input
          required
          name="email"
          onChange={handleChange}
          value={credentials.email}
          type="email"
          placeholder="Email"
        />
        <Input
          required
          name="password"
          onChange={handleChange}
          value={credentials.password}
          type="password"
          placeholder="Password"
          autoComplete="on"
        />
        <Button type="submit">Login</Button>
        {<span className="text-red-600 text-center">{error}</span>}
        {isLoading && (
          <div className="w-full flex justify-center">
            <Spinner diameter={4} />
          </div>
        )}
        <div className="flex justify-center items-center gap-2 w-full overflow-hidden text-white">
          <Separator className="w-full h-[0.8px]" />
          or
          <Separator className="w-full h-[0.8px]" />
        </div>

        <Link className={`${buttonVariants({ variant: "outline" })} font-sans`} href={"/auth/signup"}>
          CREATE NEW ACOUNT
        </Link>
      </form>
    </AuthLayout>
  );
};

export default Login;
