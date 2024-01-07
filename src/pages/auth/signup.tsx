import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useSubmitSignup } from "@/hooks/useSubmitSignup";
import Link from "next/link";
import Spinner from "@/components/loaders/Spinner";
import AuthLayout from "@/components/layouts/AuthLayout.tsx";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";

const Signup = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isRePassword, setIsRePassword] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [personalDates, setPersonalDates] = useState<SignupState>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { submitPersonalDates, isLoading, isSuccess } = useSubmitSignup(personalDates.password, personalDates.email);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (personalDates.password !== personalDates.confirmPassword) {
      setPersonalDates({
        ...personalDates,
        password: "",
        confirmPassword: "",
      });
      return setConfirmAlert(true);
    }

    const { confirmPassword, ...personalDataWithoutConfirm } = personalDates;

    submitPersonalDates(personalDataWithoutConfirm);

    setConfirmAlert(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalDates({
      ...personalDates,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthLayout>
      <div className="px-4">
        <Link
          className={`${buttonVariants({
            variant: "outline",
          })} absolute left-6 top-5`}
          href={"/auth/login"}
        >
          Back To Login
        </Link>
        <p className="text-2xl font-bold text-start py-4">SIGN UP</p>
        <form onSubmit={handleSubmit} name="signup form" className="flex flex-col gap-4">
          <div className="relative">
            <Label name={"Name"} htmlfor={"name"} />
            <Input onChange={handleChange} value={personalDates.name} name="name" type="text" placeholder="name" />
          </div>
          <div className="relative">
            <Label name={"Last Name"} htmlfor={"lastName"} />
            <Input
              required
              onChange={handleChange}
              value={personalDates.lastName}
              name="lastName"
              type="text"
              placeholder="last name"
            />
          </div>
          <div className="relative">
            <Label name={"Email"} htmlfor={"email"} />
            <Input onChange={handleChange} value={personalDates.email} name="email" type="email" placeholder="email" />
          </div>
          <div className="relative">
            <Label name={"Phone"} htmlfor={"phone"} />
            <Input
              required
              onChange={handleChange}
              value={personalDates.phone}
              name="phone"
              type="text"
              placeholder="phone number"
            />
          </div>
          <div className="relative">
            <Label name={"Password"} htmlfor={"password"} />
            <Input
              autoComplete="off"
              required
              onChange={handleChange}
              value={personalDates.password}
              name="password"
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
          </div>
          <div className="relative">
            <Label name={"Confirm Password"} htmlfor={"password"} />
            <Input
              autoComplete="off"
              required
              onChange={handleChange}
              value={personalDates.confirmPassword}
              name="confirmPassword"
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
          </div>

          {confirmAlert && <span className="text-red-600">Rectify the confirmation</span>}

          <Button className="flex gap-2" type="submit">
            Sign up {isLoading && <Spinner diameter={4} />}
          </Button>

          {isSuccess && (
            <div className="flex justify-center w-full">
              <span className="text-green-600">Successful</span>
            </div>
          )}
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
