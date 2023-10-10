const FooterDisco = ({ phone }: { phone: string }) => {
  return (
    <div className="flex justify-between backdrop-blur-md bg-black/70 relative z-50 py-16 px-8">
      <p className="text-white">Phone: {phone}</p>
    </div>
  );
};

export default FooterDisco;
