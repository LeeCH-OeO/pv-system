import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserNavBar from "./NavBar/UserNavBar";
const UserMainPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    isUnlimitedUser: false,
  });
  const fetchUserInfo = () => {
    const userName = localStorage.getItem("userName");

    const isUnlimitedUser = localStorage.getItem("isUnlimitedUser");
    if (!userName) {
      console.log("not sing in");
      navigate("/user/signup");
    }
    setUserInfo({
      ...userInfo,
      userName: userName,
      isUnlimitedUser: isUnlimitedUser,
    });
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <div>
      <UserNavBar />
      <h3>hello {userInfo.userName}</h3>
    </div>
  );
};

export default UserMainPage;
