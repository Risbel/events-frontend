import React from "react";

interface AuxProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuxProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-tr from-cyan-500  to-purple-900 ">
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
