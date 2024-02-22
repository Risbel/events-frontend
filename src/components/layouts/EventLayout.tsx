export default function EventLayout({ children, background }: { children: React.ReactNode; background?: string }) {
  return (
    <div style={{ background: background }} className="relative w-screen h-screen">
      <div className="w-full h-full absolute overflow-y-scroll">{children}</div>
    </div>
  );
}
