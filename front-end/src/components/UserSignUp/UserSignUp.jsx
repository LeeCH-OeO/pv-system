import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SignUpForm, FormContainer } from "./style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const UserSignUp = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
    isUnlimited: false,
    isActive: true,
  });

  const handleOnClick = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:1212/api/user/signup",
        data: userInfo,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      navigate("/user/signin");
    } catch (error) {
      console.log("error message", error);
    }

    setUserInfo({
      userName: "",
      email: "",
      password: "",
      isUnlimited: false,
    });
    console.log(userInfo);
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/user/profile");
    }
  }, []);
  return (
    <FormContainer>
      <SignUpForm>
        <h2>User Sign up</h2>
        <TextField
          label="username"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={userInfo.userName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, userName: e.target.value })
          }
        />
        <TextField
          label="email"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
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
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  isUnlimited: e.target.checked,
                })
              }
            />
          }
          label="I want unlimited plan"
        />
        <Button
          variant="outlined"
          onClick={handleOnClick}
          disabled={
            userInfo.userName && userInfo.email && userInfo.password
              ? false
              : true
          }
        >
          submit
        </Button>
        {/* {userInfo.image && (
          <Avatar
            src={`data:image/*;base64,${userInfo.image}`}
            sx={{ width: 56, height: 56 }}
          />
        )} */}
      </SignUpForm>
      <div>
        <p>
          Already have an account? <Link to={"/user/signin"}>Sign in →</Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default UserSignUp;
