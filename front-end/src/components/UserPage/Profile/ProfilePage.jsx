import React, { useState, useEffect } from "react";
import UserNavBar from "../NavBar/UserNavBar";
import ProfileCard from "./Card/Card";
import { useNavigate } from "react-router-dom";
import { ButtonContainer, Button } from "./Card/style";
import { DialogContainer, DialogOverlay } from "./Card/DeleteModal";
import axios from "axios";
const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    isUnlimitedUser: false,
    email: "",
    image: "",
  });
  const fetchUserInfo = async () => {
    // const userName = localStorage.getItem("userName");
    // const email = localStorage.getItem("email");
    // const isUnlimitedUser = localStorage.getItem("isUnlimitedUser");
    // if (!userName || !email || !isUnlimitedUser) {
    //   console.log("not sing in");
    //   navigate("/user/signup");
    // }
    try {
      const res = await axios.get("http://localhost:3000/account");
      setUserInfo({
        ...userInfo,
        userName: res.data.userName,
        isUnlimitedUser: res.data.isUnlimitedUser,
        email: res.data.email,
        image: res.data.image,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("isUnlimitedUser");
    navigate("/");
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <UserNavBar />
      {userInfo.userName ? (
        <>
          <ProfileCard
            name={userInfo.userName}
            isUnlimited={userInfo.isUnlimitedUser}
            email={userInfo.email}
            avatar={
              userInfo.image
                ? `data:image/*;base64,${userInfo.image}`
                : "https://1.bp.blogspot.com/-23RzpcbS5R4/XXXOrXeT1kI/AAAAAAABUxQ/KpvTE1WQ0cQ2XZXQTmAfYbruwff7XoI5wCLcBGAs/s1600/pet_cat_oddeye_black.png"
            }
          />
          <ButtonContainer>
            <Button
              onClick={() => {
                navigate("/user/edit-profile/", {
                  state: { userName: userInfo.userName, email: userInfo.email },
                });
              }}
            >
              edit
            </Button>
            <Button onClick={handleOpenDialog}>delete</Button>
            {isOpen && (
              <DialogOverlay>
                <DialogContainer open onClose={handleCloseDialog}>
                  <h2>Confirmation</h2>
                  <p>Do you really want to delete your account?</p>
                  <ButtonContainer>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={() => handleDelete()}>Delete</Button>
                  </ButtonContainer>
                </DialogContainer>
              </DialogOverlay>
            )}
          </ButtonContainer>
        </>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default ProfilePage;
