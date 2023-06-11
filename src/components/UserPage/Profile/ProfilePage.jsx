import React, { useState, useEffect } from "react";
import UserNavBar from "../NavBar/UserNavBar";
import ProfileCard from "./Card/Card";
import { useNavigate } from "react-router-dom";
import { ButtonContainer, Button } from "./Card/style";
import { DialogContainer, DialogOverlay } from "./Card/DeleteModal";
const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    isUnlimitedUser: false,
    email: "",
  });
  const fetchUserInfo = () => {
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");
    const isUnlimitedUser = localStorage.getItem("isUnlimitedUser");
    if (!userName || !email || !isUnlimitedUser) {
      console.log("not sing in");
      navigate("/user/signup");
    }
    setUserInfo({
      ...userInfo,
      userName: userName,
      isUnlimitedUser: JSON.parse(isUnlimitedUser.toLowerCase()),
      email: email,
    });
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
            avatar="https://3.bp.blogspot.com/-KgUzGDeV8r8/VaMOD3z_X-I/AAAAAAAAvh8/YK5LucKKUmo/s800/boy_01.png"
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
