import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SignUpForm from "./style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanySignUp = () => {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    email: "",
    password: "",
  });
  const handleOnClick = () => {
    console.log(companyInfo);
    localStorage.setItem("companyName", companyInfo.companyName);
    localStorage.setItem("companyEmail", companyInfo.email);
    navigate("/company/main");
    setCompanyInfo({
      companyName: "",
      email: "",
      password: "",
    });
  };
  return (
    <SignUpForm>
      <h2>Company Sign up</h2>

      <div>
        <TextField
          label="Company name"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={companyInfo.companyName}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, companyName: e.target.value })
          }
        />
      </div>
      <div>
        <TextField
          label="email"
          margin="dense"
          autoComplete="off"
          fullWidth
          value={companyInfo.email}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, email: e.target.value })
          }
        />
      </div>
      <div>
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
      </div>

      <div>
        <Button
          variant="outlined"
          onClick={handleOnClick}
          disabled={
            companyInfo.companyName && companyInfo.email && companyInfo.password
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

export default CompanySignUp;
