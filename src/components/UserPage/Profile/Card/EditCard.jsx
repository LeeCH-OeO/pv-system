import { TextField } from "@mui/material";
import React from "react";
import { EditCardContainer } from "./style";
import { useState } from "react";
import UserNavBar from "../../NavBar/UserNavBar";
import { useLocation, useNavigate } from "react-router-dom";
const EditCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const originalName = location.state?.userName || "";
  const originalEmail = location.state?.email || "";
  const [userInfo, setUserInfo] = useState({
    userName: originalName,
    email: originalEmail,
  });

  const handleOnSubmit = () => {
    localStorage.setItem("userName", userInfo.userName);
    localStorage.setItem("email", userInfo.email);
    navigate("/user/profile/");
  };
  return (
    <div>
      <UserNavBar />
      <EditCardContainer>
        <TextField
          fullWidth
          label="Name"
          variant="filled"
          value={userInfo.userName}
          onChange={(e) => {
            setUserInfo({ ...userInfo, userName: e.target.value });
          }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="filled"
          value={userInfo.email}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
        <TextField fullWidth label="old password" variant="filled" required />
        <TextField fullWidth label="new password" variant="filled" required />
      </EditCardContainer>
      <button
        onClick={() => {
          handleOnSubmit();
        }}
      >
        submit
      </button>
    </div>
  );
};

export default EditCard;
