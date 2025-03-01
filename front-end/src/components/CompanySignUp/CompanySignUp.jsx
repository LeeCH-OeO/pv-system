import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SignUpForm, FormContainer } from "./style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const CompanySignUp = () => {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    email: "",
    password: "",
  });
  const handleOnClick = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:1212/api/company/signup",
        data: companyInfo,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      navigate("/company/signin");
    } catch (error) {
      console.log("error message", error);
    }
    setCompanyInfo({
      companyName: "",
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    if (localStorage.getItem("companyToken")) {
      navigate("/company/profile");
    }
  }, []);
  return (
    <FormContainer>
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
              companyInfo.companyName &&
              companyInfo.email &&
              companyInfo.password
                ? false
                : true
            }
          >
            submit
          </Button>
        </div>
      </SignUpForm>
      <div>
        <p>
          Already have an account? <Link to={"/company/signin"}>Sign in →</Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default CompanySignUp;
