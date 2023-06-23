import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SignUpForm, FormContainer } from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
const UserSignIn = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    password: "",
  });
  const handleOnClick = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:1212/api/user/login",
        data: userInfo,
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("userToken", res.data.accessToken);
      navigate("/user/profile");
    } catch (error) {
      console.log("error message", error);
      alert("accout not found");
    }

    setUserInfo({
      userName: "",
      password: "",
    });
  };
  return (
    <FormContainer>
      <SignUpForm>
        <h2>User Sign in</h2>
        <TextField
          label="user name"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={userInfo.userName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, userName: e.target.value })
          }
        />
        <TextField
          label="password"
          type="password"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <Button
          variant="outlined"
          onClick={handleOnClick}
          disabled={userInfo.userName && userInfo.password ? false : true}
        >
          submit
        </Button>
      </SignUpForm>
    </FormContainer>
  );
};

export default UserSignIn;
