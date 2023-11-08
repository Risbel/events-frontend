import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubmitSignup } from "@/hooks/useSubmitSignup";
import Link from "next/link";
import Spinner from "@/components/loaders/Spinner";
import AuthLayout from "@/components/layouts/AuthLayout.tsx";

const Signup = () => {
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
      <Link
        className={`${buttonVariants({
          variant: "outline",
        })} `}
        href={"/auth/login"}
      >
        Back To Login
      </Link>
      <p className="text-2xl font-bold text-white text-center py-4">Sign Up</p>
      <form
        onSubmit={handleSubmit}
        name="signup form"
        className="flex flex-col gap-4 border p-4  bg-slate-200/10 backdrop-blur-2xl"
      >
        <Input onChange={handleChange} value={personalDates.name} name="name" type="text" placeholder="name" />
        <Input
          required
          onChange={handleChange}
          value={personalDates.lastName}
          name="lastName"
          type="text"
          placeholder="last name"
        />
        <Input onChange={handleChange} value={personalDates.email} name="email" type="email" placeholder="email" />
        <Input
          required
          onChange={handleChange}
          value={personalDates.phone}
          name="phone"
          type="text"
          placeholder="phone number"
        />
        <Input
          autoComplete="off"
          required
          onChange={handleChange}
          value={personalDates.password}
          name="password"
          type="password"
          placeholder="password"
        />

        <Input
          autoComplete="off"
          required
          onChange={handleChange}
          value={personalDates.confirmPassword}
          name="confirmPassword"
          type="password"
          placeholder="confirm password"
        />

        {confirmAlert && <span className="text-red-600">Rectify the confirmation</span>}

        <Button type="submit">Sign up</Button>
        {isLoading && (
          <div className="flex w-full justify-center">
            <Spinner diameter={4} />
          </div>
        )}
        {isSuccess && (
          <div className="flex justify-center w-full">
            <span className="text-green-600">Successful</span>
          </div>
        )}
      </form>
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
