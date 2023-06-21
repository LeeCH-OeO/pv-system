import React from "react";
import ProfileCard from "./Card/Card";
import { ButtonContainer } from "./Card/style";
import CompanyNavBar from "../NavBar/CompanyNavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DialogOverlay, DialogContainer } from "./Card/DeleteModal";
const CompanyProfilePage = () => {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    companyEmail: "",
  });
  const fetchCompanyInfo = () => {
    const companyName = localStorage.getItem("companyName");
    const companyEmail = localStorage.getItem("companyEmail");
    if (!companyName || !companyEmail) {
      console.log("No info");
      navigate("/company/signup");
    }
    setCompanyInfo({ companyName: companyName, companyEmail: companyEmail });
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

  const handleDelete = () => {
    localStorage.removeItem("companyName");
    localStorage.removeItem("companyEmail");
    navigate("/");
  };
  return (
    <div>
      <CompanyNavBar />
      <ProfileCard
        name={companyInfo.companyName}
        email={companyInfo.companyEmail}
        avatar="https://3.bp.blogspot.com/-KgUzGDeV8r8/VaMOD3z_X-I/AAAAAAAAvh8/YK5LucKKUmo/s800/boy_01.png"
      />
      <ButtonContainer>
        <button
          onClick={() => {
            navigate("/company/edit-profile", {
              state: {
                companyName: companyInfo.companyName,
                companyEmail: companyInfo.companyEmail,
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
