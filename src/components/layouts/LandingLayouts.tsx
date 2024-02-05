import NavbarLanding from "../navigation/NavbarLanding";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-screen h-screen">
      <NavbarLanding />
      <div className="w-full h-full absolute z-20 overflow-y-scroll overflow-x-hidden">{children}</div>
    </div>
  );
};

export default LandingLayout;
