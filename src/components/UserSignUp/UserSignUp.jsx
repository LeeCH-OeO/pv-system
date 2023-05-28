import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
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
    isUnlimitedUser: false,
  });
  const handleOnClick = () => {
    console.log(userInfo);
    localStorage.setItem("firstName", userInfo.firstName);
    localStorage.setItem("lastName", userInfo.lastName);
    localStorage.setItem("isUnlimitedUser", userInfo.isUnlimitedUser);
    navigate("/user/main");
    setUserInfo({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isUnlimitedUser: false,
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
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) =>
                setUserInfo({ ...userInfo, isUnlimitedUser: e.target.checked })
              }
            />
          }
          label="I want unlimited plan"
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
