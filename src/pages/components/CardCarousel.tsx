import { useState, MouseEvent, useRef, useMemo } from "react";

function throttle<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

const CardCarousel = ({ title, description }: { title: string; description: string }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useMemo(
    () =>
      throttle((e: MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const box = card.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        const centerX = box.width / 2;
        const centerY = box.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        setRotate({ x: rotateX, y: rotateY });
      }, 100),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <>
      <div
        className="card relative mx-2  h-80 w-full md:h-72 md:w-72 lg:h-96 lg:w-96 text-white rounded-xl bg-white transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        <div className="group relative flex h-full w-full select-none items-center justify-center rounded-lg bg-black text-sm font-light text-slate-300 border cursor-{}">
          <div className="duration-600 absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#f2f0ff] opacity-0 blur transition group-hover:opacity-75" />
          <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-black to-slate-950 px-8 py-16 shadow-2xl"
          >
            <div className="absolute inset-0 z-10 h-full w-full bg-[linear-gradient(to_right,#bdbdbd1e_1px,transparent_1px),linear-gradient(to_bottom,#bdbdbd3c_1px,transparent_1px)] bg-[size:4rem_2rem]"></div>

            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity,
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 40%)`,
              }}
            />
            <div className="relative flex flex-col justify-around items-center h-full">
              <h1 className="text-2xl lg:text-3xl font-extrabold text-center">{title}</h1>
              <p className="text-lg lg:text-xl text-center">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCarousel;
