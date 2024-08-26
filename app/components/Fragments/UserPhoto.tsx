import Image from "next/image";
import React from "react";

type UserPhotoProps = {
  username: string;
  role: string;
}

const UserPhoto = ({ username, role }: UserPhotoProps) => {
  return (
    <div className="flex mt-10 items-center">
      <Image
        src="/assets/dashboard/dashboard/profile.png"
        alt="profile"
        width={30}
        height={30}
        className="mr-3 border-2 rounded-full border-ijoToska"
      /> 
      <div>
        <h4 className="font-semibold text-sm italic">{username}</h4>
        <p className="text-xs italic">{role}</p>
      </div>
    </div>
  );
};

export default UserPhoto;
