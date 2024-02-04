const FooterDisco = ({ phone }: { phone: string }) => {
  return (
    <div className="flex justify-between backdrop-blur-md bg-black/70 relative py-16 px-8 mt-40">
      <p className="text-white">Phone: {phone}</p>
    </div>
  );
};

export default FooterDisco;
