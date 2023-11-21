import { DataDisco } from "@/services/getDisco";
import Image from "next/image";
import React from "react";
import AdminSettings from "./AdminSettings";
import { ImyPermissions } from "@/services/getMyPermissionsOnDisco";
import useHavePermissions from "@/utils/useHavePermissions";

const Head = ({ disco, myPermissions }: { disco: DataDisco; myPermissions: ImyPermissions }) => {
  const { havePermission } = useHavePermissions(myPermissions);

  return (
    <div className="relative">
      {havePermission("read", "Admin settings on disco") && <AdminSettings disco={disco} />}

      <div className="flex items-center gap-4 md:gap-8">
        {disco && (
          <Image
            className="rounded-full h-20 w-20 md:h-36 md:w-36"
            src={disco?.logo}
            alt={disco?.name}
            height={100}
            width={100}
          />
        )}
        <h1 className="py-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400 font-extrabold text-5xl md:text-7xl">
          {disco?.name}
        </h1>
      </div>

      <p className="text-white text-xl md:text-2xl pt-4">{disco?.discoDetail.description}</p>
    </div>
  );
};

export default Head;
