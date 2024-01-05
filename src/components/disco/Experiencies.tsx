import React from "react";
import AddExperienceButton from "../buttons/AddExperienceButton";
import Image from "next/image";

import { DiscoDetail } from "@/services/getDisco";

import useHavePermissions from "@/utils/useHavePermissions";
import { ImyPermissions } from "@/services/getMyPermissionsOnDisco";
import DeleteExperienceButton from "../buttons/DeleteExperienceButton";

const Experiencies = ({ discoDetail, myPermissions }: { discoDetail: DiscoDetail; myPermissions: ImyPermissions }) => {
  const { havePermission } = useHavePermissions(myPermissions);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-extrabold text-4xl text-white pt-5 pb-2 text-center md:text-start">Experiencies</h1>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-5 gap-4">
        {discoDetail?.discoImages?.map(
          (discoImage, index) =>
            discoImage && (
              <div key={index}>
                <Image
                  priority
                  placeholder="blur"
                  className="object-cover max-h-72 rounded-2xl"
                  src={discoImage.image}
                  width={400}
                  height={400}
                  alt={`experiencie${discoImage.id}`}
                />
                <p className="text-white text-xs md:text-md font-light text-start">{discoImage?.imageText}</p>
                {havePermission("delete", "Disco Images") && <DeleteExperienceButton id={discoImage.id} />}
              </div>
            )
        )}
      </div>

      {havePermission("create", "Disco Images") && <AddExperienceButton discoDetailId={discoDetail.id} />}
    </div>
  );
};

export default Experiencies;
