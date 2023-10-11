import React from "react";
import AddExperienceButton from "../buttons/AddExperienceButton";
import Image from "next/image";

import { DiscoDetail } from "@/services/getDisco";
import { ImyPermissions } from "@/services/getMyPermissionsOnDisco";

const Experiencies = ({ discoDetail, permissions }: { discoDetail: DiscoDetail; permissions: ImyPermissions }) => {
  const havePermission =
    permissions &&
    permissions.DiscoRole.rolePermissionResouces.find(
      (permisionResource) =>
        permisionResource.Permission.name === "create" && permisionResource.Resource.name === "discoImages"
    );

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-extrabold text-4xl text-white pt-5 pb-2">Experiencies</h1>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-5 gap-8">
        {discoDetail?.discoImages?.map(
          (discoImage, index) =>
            discoImage && (
              <div key={index}>
                <Image
                  className="object-cover max-h-72 rounded-2xl"
                  src={discoImage.image}
                  width={500}
                  height={500}
                  alt="experiencies"
                />
                <p className="text-white text-md md:text-md font-light text-start">{discoImage?.imageText}</p>
              </div>
            )
        )}
      </div>
      {havePermission && <AddExperienceButton discoDetailId={discoDetail.id} />}
    </div>
  );
};

export default Experiencies;
