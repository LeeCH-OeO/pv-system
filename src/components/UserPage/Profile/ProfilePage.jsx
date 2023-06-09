import React, { useState, useEffect } from "react";
import UserNavBar from "../NavBar/UserNavBar";
import ProfileCard from "./Card/Card";
import EditCard from "./Card/editCard";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userName: "",
    isUnlimitedUser: false,
    email: "",
  });
  const fetchUserInfo = () => {
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");
    const isUnlimitedUser = localStorage.getItem("isUnlimitedUser");
    if (!userName) {
      console.log("not sing in");
      navigate("/user/signup");
    }
    setUserInfo({
      ...userInfo,
      userName: userName,
      isUnlimitedUser: JSON.parse(isUnlimitedUser.toLowerCase()),
      email: email,
    });
  };
  useEffect(() => {
    fetchUserInfo();
    console.log(userInfo);
  }, []);

  return (
    <div>
      <UserNavBar />
      <h1>{isEdit ? "Edit Profile" : "My Profile"}</h1>
      {userInfo.userName ? (
        <div>
          {isEdit ? (
            <EditCard
              name={userInfo.userName}
              isUnlimited={userInfo.isUnlimitedUser}
              email={userInfo.email}
            />
          ) : (
            <ProfileCard
              name={userInfo.userName}
              isUnlimited={userInfo.isUnlimitedUser}
              email={userInfo.email}
              avatar="https://3.bp.blogspot.com/-KgUzGDeV8r8/VaMOD3z_X-I/AAAAAAAAvh8/YK5LucKKUmo/s800/boy_01.png"
            />
          )}
        </div>
      ) : (
        <p>loading</p>
      )}

      <button onClick={() => setIsEdit(!isEdit)} hidden={isEdit}>
        edit
      </button>
      <button hidden={isEdit}>delete</button>
    </div>
  );
};

export default ProfilePage;
