import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSubmitCredentials = (initialState: { email: string; password: string }) => {
  const router = useRouter();
  const [credentials, setCredentials] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitWithCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
      callbackUrl: "/",
    });

    if (status?.url) {
      router.push(status.url);
    }

    if (!status?.url) {
      setError(status?.error || "An error occurred");
    }
    setIsLoading(false);
  };

  return {
    handleChange,
    credentials,
    isLoading,
    setIsLoading,
    error,
    setError,
    onSubmitWithCredentials,
  };
};
