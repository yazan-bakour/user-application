"use client";

import { useFormContext } from "react-hook-form";
import { memo } from "react";
import { FormData } from "./types";
import Certification from "./Certification";
import Languages from "./Languages";
import Skills from "./Skills";

interface ProfileProps {
  isEdit: boolean;
}

const Profile = memo(({ isEdit }: ProfileProps) => {
  const {} = useFormContext<FormData>();

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Skills & Languages Section */}

      <div className="gap-8 w-full grid grid-cols-1 md:grid-cols-2">
        {/* Skills */}
        <Skills isEdit={isEdit} />

        {/* Languages */}
        <Languages isEdit={isEdit} />
      </div>
      {/* Certifications */}
      <Certification isEdit={isEdit} />
    </div>
  );
});

Profile.displayName = "Profile";

export default Profile;
