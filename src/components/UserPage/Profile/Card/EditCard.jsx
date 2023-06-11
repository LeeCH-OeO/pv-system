import { TextField } from "@mui/material";
import React from "react";
import { EditCardContainer, EditFormContainer, Button } from "./style";
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
    <>
      <UserNavBar />
      <EditCardContainer>
        <h2>Edit Profile</h2>
        <EditFormContainer>
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
        </EditFormContainer>
        <Button
          onClick={() => {
            handleOnSubmit();
          }}
        >
          submit
        </Button>
      </EditCardContainer>
    </>
  );
};

export default EditCard;
