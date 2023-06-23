import React from "react";
import ProfileCard from "./Card/Card";
import { ButtonContainer, Button } from "./Card/style";
import CompanyNavBar from "../NavBar/CompanyNavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DialogOverlay, DialogContainer } from "./Card/DeleteModal";
import axios from "axios";
const CompanyProfilePage = () => {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    email: "",
  });
  const fetchCompanyInfo = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:1212/api/company/profile",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
        },
      });
      setCompanyInfo({
        companyName: res.data.companyName,
        email: res.data.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios({
        method: "delete",
        url: "http://127.0.0.1:1212/api/company/delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
        },
      });
      if (res) {
        navigate("/");
        localStorage.removeItem("companyToken");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <CompanyNavBar />
      <ProfileCard
        name={companyInfo.companyName}
        email={companyInfo.email}
        avatar="https://2.bp.blogspot.com/-9GI-xR771PQ/V9vCF4H88XI/AAAAAAAA97Y/i6vP18O0rToLsdj04YOj6qjVQFtwn4lQACLcB/s800/company_character1_baby.png"
      />
      <ButtonContainer>
        <Button
          onClick={() => {
            navigate("/company/edit-profile", {
              state: {
                companyName: companyInfo.companyName,
                email: companyInfo.email,
              },
            });
          }}
        >
          edit
        </Button>
        <Button onClick={() => handleOpenDialog()}>delete</Button>
        {isOpen && (
          <DialogOverlay>
            <DialogContainer open onClose={handleCloseDialog}>
              <h2>Confirmation</h2>
              <p>Do you really want to delete your account?</p>
              <ButtonContainer>
                <Button onClick={handleCloseDialog}>Cancel</Button>

                <Button onClick={() => handleDelete()}>Delete</Button>
              </ButtonContainer>{" "}
            </DialogContainer>
          </DialogOverlay>
        )}
      </ButtonContainer>
    </div>
  );
};

export default CompanyProfilePage;
