import React from "react";
import CompanyNavBar from "./NavBar/CompanyNavBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const CompanyMainPage = () => {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
  });
  const fetchCompanyInfo = () => {
    const companyName = localStorage.getItem("companyName");

    if (!companyName) {
      console.log("not sing in");
      navigate("/company/signup");
    }
    setCompanyInfo({
      ...companyInfo,
      companyName: companyName,
    });
  };
  useEffect(() => {
    fetchCompanyInfo();
  }, []);
  return (
    <div>
      <CompanyNavBar />
      <h3>hello{companyInfo.companyName}</h3>
    </div>
  );
};

export default CompanyMainPage;
