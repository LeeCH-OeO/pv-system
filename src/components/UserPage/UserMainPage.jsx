import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserNavBar from "./NavBar/UserNavBar";
const UserMainPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    isUnlimitedUser: false,
  });
  const fetchUserInfo = () => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const isUnlimitedUser = localStorage.getItem("isUnlimitedUser");
    if (!(firstName && lastName)) {
      console.log("not sing in");
      navigate("/user/signup");
    }
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
      <UserNavBar />
    </div>
  );
};

export default UserMainPage;
