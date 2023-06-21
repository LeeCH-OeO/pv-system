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
const CompanySignIn = () => {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    password: "",
  });
  const handleOnClick = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:1212/api/company/login",
        data: companyInfo,
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("companyToken", res.data.accessToken);
      navigate("/company/profile");
    } catch (error) {
      console.log("error message", error);
    }

    setCompanyInfo({
      companyName: "",
      password: "",
    });
  };
  return (
    <FormContainer>
      <SignUpForm>
        <h2>Comapny Sign in</h2>
        <TextField
          label="user name"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={companyInfo.companyName}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, companyName: e.target.value })
          }
        />
        <TextField
          label="password"
          type="password"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={companyInfo.password}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, password: e.target.value })
          }
        />
        <Button
          variant="outlined"
          onClick={handleOnClick}
          disabled={
            companyInfo.companyName && companyInfo.password ? false : true
          }
        >
          submit
        </Button>
      </SignUpForm>
    </FormContainer>
  );
};

export default CompanySignIn;
