import React from "react";
import { signOut } from "next-auth/react";

const Logout = () => {
  const logout = async () => {
    signOut();
  };

  return (
    <button className="font-semibold" onClick={logout}>
      Log out
    </button>
  );
};

export default Logout;
