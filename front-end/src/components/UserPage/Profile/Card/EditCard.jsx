import { TextField } from "@mui/material";
import React from "react";
import { EditCardContainer, EditFormContainer, Button } from "./style";
import { useState } from "react";
import UserNavBar from "../../NavBar/UserNavBar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const EditCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const originalName = location.state?.userName || "";
  const originalEmail = location.state?.email || "";
  const [userInfo, setUserInfo] = useState({
    userName: originalName,
    email: originalEmail,
  });

  const handleOnSubmit = async () => {
    console.log(userInfo);
    try {
      const res = await axios({
        method: "patch",
        url: "http://127.0.0.1:1212/api/user/",
        data: { data: userInfo },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (res) {
        navigate("/user/signin");
        localStorage.removeItem("userToken");
      }
    } catch (error) {
      console.log(error);
    }
    setUserInfo({ userName: originalName, email: originalEmail });
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
