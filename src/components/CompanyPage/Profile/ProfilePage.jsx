import React from "react";
import ProfileCard from "./Card/Card";
import CompanyNavBar from "../NavBar/CompanyNavBar";
const CompanyProfilePage = () => {
  const tempInfo = {
    companyName: "Edeka",
    email: "edeka@gmail.com",
  };

  return (
    <div>
      <CompanyNavBar />
      <h1>Profile</h1>
      <ProfileCard
        name={tempInfo.companyName}
        email={tempInfo.email}
        avatar="https://3.bp.blogspot.com/-KgUzGDeV8r8/VaMOD3z_X-I/AAAAAAAAvh8/YK5LucKKUmo/s800/boy_01.png"
      />
    </div>
  );
};

export default CompanyProfilePage;
