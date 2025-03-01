import React from "react";
import CompanyNavBar from "../../NavBar/CompanyNavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditCardContainer, EditFormContainer, Button } from "./style";
import { TextField } from "@mui/material";
import axios from "axios";
const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const originalCompanyName = location.state?.companyName || "";
  const originalEmail = location.state?.email || "";
  const [companyInfo, setCompanyInfo] = useState({
    companyName: originalCompanyName,
    email: originalEmail,
  });
  const handleSubmit = async () => {
    try {
      const res = await axios({
        method: "patch",
        url: "http://127.0.0.1:1212/api/company/",
        data: { data: companyInfo },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
        },
      });
      if (res) {
        navigate("/company/signin");
        localStorage.removeItem("companyToken");
      }
    } catch (error) {
      console.log(error);
    }
    setCompanyInfo({ companyInfo: originalCompanyName, email: originalEmail });
  };
  return (
    <div>
      <CompanyNavBar />
      <EditCardContainer>
        <EditFormContainer>
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
            value={companyInfo.email}
            onChange={(e) => {
              setCompanyInfo({ ...companyInfo, email: e.target.value });
            }}
          />
        </EditFormContainer>
        <Button onClick={() => handleSubmit()}>submit</Button>
      </EditCardContainer>
    </div>
  );
};

export default EditProfile;
