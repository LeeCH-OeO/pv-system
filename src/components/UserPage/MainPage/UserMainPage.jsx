import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../NavBar/UserNavBar";
import { InfoContainer, MainPageContainer } from "./style";
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
    <>
      <UserNavBar />
      <MainPageContainer>
        <InfoContainer>
          <h2>Hello {userInfo.userName}</h2>
        </InfoContainer>
      </MainPageContainer>
    </>
  );
};

export default UserMainPage;
