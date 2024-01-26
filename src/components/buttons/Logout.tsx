import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const Logout = () => {
  const logout = async () => {
    signOut();
  };

  return (
    <button className="flex justify-between items-center w-full font-semibold" onClick={logout}>
      Log out
      <LogOut className="h-4 w-4 -rotate-90" />
    </button>
  );
};

export default Logout;
