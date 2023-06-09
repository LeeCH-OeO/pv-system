import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SignUpForm from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

const UserSignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
    isUnlimitedUser: false,
  });
  const [base64String, setBase64String] = useState("");

  const handleEncodeImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64 = event.target.result.split(",")[1];
      setBase64String(base64);
    };

    reader.readAsDataURL(file);
  };
  const handleOnClick = () => {
    console.log(userInfo);
    localStorage.setItem("userName", userInfo.userName);
    localStorage.setItem("isUnlimitedUser", userInfo.isUnlimitedUser);
    localStorage.setItem("email", userInfo.email);
    navigate("/user/main");
    setUserInfo({
      userName: "",
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
          label="user name"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={userInfo.userName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, userName: e.target.value })
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
        upload your profile photo
        <input type="file" accept="image/*" onChange={handleEncodeImage} />
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
            userInfo.userName && userInfo.email && userInfo.password
              ? false
              : true
          }
        >
          submit
        </Button>
      </div>
      {base64String && (
        <Avatar
          src={`data:image/*;base64,${base64String}`}
          sx={{ width: 56, height: 56 }}
        />
      )}
    </SignUpForm>
  );
};

export default UserSignUp;
