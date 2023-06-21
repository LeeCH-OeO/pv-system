import React from "react";
import ProfileCard from "./Card/Card";
import { ButtonContainer } from "./Card/style";
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
        avatar="https://3.bp.blogspot.com/-KgUzGDeV8r8/VaMOD3z_X-I/AAAAAAAAvh8/YK5LucKKUmo/s800/boy_01.png"
      />
      <ButtonContainer>
        <button
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
        </button>
        <button onClick={() => handleOpenDialog()}>delete</button>
        {isOpen && (
          <DialogOverlay>
            <DialogContainer open onClose={handleCloseDialog}>
              <h2>Confirmation</h2>
              <p>Do you really want to delete your account?</p>
              <ButtonContainer>
                <button onClick={handleCloseDialog}>Cancel</button>

                <button onClick={() => handleDelete()}>Delete</button>
              </ButtonContainer>{" "}
            </DialogContainer>
          </DialogOverlay>
        )}
      </ButtonContainer>
    </div>
  );
};

export default CompanyProfilePage;
