import React from "react";
import { ProfileCardContainer, AvatarImage, ButtonContainer } from "./style";
const ProfileCard = ({ name, email, avatar }) => {
  return (
    <div>
      <ProfileCardContainer>
        <AvatarImage src={avatar} />
        <h3>{name}</h3>
        <h4>{email}</h4>{" "}
      </ProfileCardContainer>
      <ButtonContainer>
        <button>edit</button> <button>delete</button>{" "}
      </ButtonContainer>
    </div>
  );
};

export default ProfileCard;
