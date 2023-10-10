import { SessionProvider } from "next-auth/react";

interface Props {
  children?: React.ReactNode;
}

export default function NextAuthSessionProvider({ children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
