import React from "react";
import { useState, useEffect } from "react";
const UserMainPage = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "321",
    lastName: "123",
    isUnlimitedUser: false,
  });
  const fetchUserInfo = () => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const isUnlimitedUser = localStorage.getItem("isUnlimitedUser");
    setUserInfo({
      ...userInfo,
      firstName: firstName,
      lastName: lastName,
      isUnlimitedUser: isUnlimitedUser,
    });
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <div>
      <h2>
        hello!{" "}
        {userInfo.isUnlimitedUser === "true" ? "Unlimited User" : "free user"}
        {": "}
        {userInfo.firstName} {userInfo.lastName}
      </h2>
    </div>
  );
};

export default UserMainPage;
