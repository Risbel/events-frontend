import HomeLayout from "@/components/layouts/HomeLayout";
import PermissionsContainer from "@/components/permissions/PermissionsContainer";

import React from "react";

const Permissions = () => {
  return (
    <HomeLayout>
      <div className="pt-24 px-6 md:px-16">
        <PermissionsContainer />
      </div>
    </HomeLayout>
  );
};

export default Permissions;
