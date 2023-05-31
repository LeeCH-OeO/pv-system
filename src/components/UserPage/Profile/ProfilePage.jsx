import React from "react";
import UserNavBar from "../NavBar/UserNavBar";
import ProfileCard from "./Card/Card";

const ProfilePage = () => {
  const tempInfo = {
    name: "John Snow",
    isUnlimited: true,
    email: "js@gmail.com",
  };

  return (
    <div>
      <UserNavBar />
      <h1>Profile</h1>
      <ProfileCard
        name={tempInfo.name}
        isUnlimited={tempInfo.isUnlimited}
        email={tempInfo.email}
        avatar="https://3.bp.blogspot.com/-KgUzGDeV8r8/VaMOD3z_X-I/AAAAAAAAvh8/YK5LucKKUmo/s800/boy_01.png"
      />
    </div>
  );
};

export default ProfilePage;
