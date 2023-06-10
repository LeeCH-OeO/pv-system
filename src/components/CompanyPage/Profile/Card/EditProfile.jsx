import React from "react";
import CompanyNavBar from "../../NavBar/CompanyNavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditCardContainer } from "./style";
import { TextField } from "@mui/material";
const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const originalCompanyName = location.state?.companyName || "";
  const originalCompanyEmail = location.state?.companyEmail || "";
  const [companyInfo, setCompanyInfo] = useState({
    companyName: originalCompanyName,
    companyEmail: originalCompanyEmail,
  });
  const handleSubmit = () => {
    localStorage.setItem("companyName", companyInfo.companyName);
    localStorage.setItem("companyEmail", companyInfo.companyEmail);
    navigate("/company/profile");
  };
  return (
    <div>
      <CompanyNavBar />
      <EditCardContainer>
        <TextField
          fullWidth
          label="Company Name"
          variant="filled"
          value={companyInfo.companyName}
          onChange={(e) => {
            setCompanyInfo({ ...companyInfo, companyName: e.target.value });
          }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="filled"
          value={companyInfo.companyEmail}
          onChange={(e) => {
            setCompanyInfo({ ...companyInfo, companyEmail: e.target.value });
          }}
        />
        <button onClick={() => handleSubmit()}>submit</button>
      </EditCardContainer>
    </div>
  );
};

export default EditProfile;
