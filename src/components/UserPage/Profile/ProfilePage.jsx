import React, { useState, useEffect } from "react";
import UserNavBar from "../NavBar/UserNavBar";
import ProfileCard from "./Card/Card";
import { useNavigate } from "react-router-dom";
import { ButtonContainer } from "./Card/style";
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
    if (!userName) {
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
      <h1>My Profile</h1>
      {userInfo.userName ? (
        <>
          <ProfileCard
            name={userInfo.userName}
            isUnlimited={userInfo.isUnlimitedUser}
            email={userInfo.email}
            avatar="https://3.bp.blogspot.com/-KgUzGDeV8r8/VaMOD3z_X-I/AAAAAAAAvh8/YK5LucKKUmo/s800/boy_01.png"
          />
          <ButtonContainer>
            <button
              onClick={() => {
                navigate("/user/edit-profile/", {
                  state: { userName: userInfo.userName, email: userInfo.email },
                });
              }}
            >
              edit
            </button>
            <button onClick={handleOpenDialog}>delete</button>
            {isOpen && (
              <DialogOverlay>
                <DialogContainer open onClose={handleCloseDialog}>
                  <h2>Confirmation</h2>
                  <p>Do you really want to delete your account?</p>
                  <button onClick={handleCloseDialog}>Cancel</button>
                  <button onClick={() => handleDelete()}>Delete</button>
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
