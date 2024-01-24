import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const ButtonStart = () => {
  const divRef = useRef<HTMLButtonElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <Link href={"/"}>
      <button
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-slate-800 bg-foreground pl-6 pr-12 font-medium text-slate-300 shadow-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(50px circle at ${position.x}px ${position.y}px, rgba(207, 207, 207, 0.159), #0000000f)`,
          }}
        />
        Get Started
        <ArrowRightIcon className="absolute h-full w-full p-3 left-12 hover:translate-x-1 right-0 transition-transform" />
      </button>
    </Link>
  );
};

export default ButtonStart;
