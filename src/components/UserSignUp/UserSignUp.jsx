import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SignUpForm from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleOnClick = () => {
    console.log(userInfo);
    localStorage.setItem("firstName", userInfo.firstName);
    localStorage.setItem("lastName", userInfo.lastName);
    navigate("/user/main");
    setUserInfo({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };
  return (
    <SignUpForm>
      <h2>User Sign up</h2>

      <div>
        <TextField
          label="first name"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={userInfo.firstName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, firstName: e.target.value })
          }
        />
      </div>
      <div>
        <TextField
          label="last name"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={userInfo.lastName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, lastName: e.target.value })
          }
        />
      </div>
      <div>
        <TextField
          label="email"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </div>
      <div>
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
      </div>

      <div>
        <Button
          variant="outlined"
          onClick={handleOnClick}
          disabled={
            userInfo.firstName &&
            userInfo.lastName &&
            userInfo.email &&
            userInfo.password
              ? false
              : true
          }
        >
          submit
        </Button>
      </div>
    </SignUpForm>
  );
};

export default UserSignUp;
