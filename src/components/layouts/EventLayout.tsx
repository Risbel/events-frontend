export default function EventLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen h-screen">
      <div className="w-full h-full absolute overflow-y-scroll">{children}</div>
    </div>
  );
}
