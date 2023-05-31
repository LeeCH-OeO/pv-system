import React from "react";
import {
  ProfileCardContainer,
  AvatarImage,
  UnlimitedAvatarImage,
  ButtonContainer,
} from "./style";
const ProfileCard = ({ name, email, isUnlimited, avatar }) => {
  console.log(isUnlimited);
  return (
    <div>
      <ProfileCardContainer>
        {isUnlimited ? (
          <UnlimitedAvatarImage src={avatar} />
        ) : (
          <AvatarImage src={avatar} />
        )}
        <h3>{name}</h3>
        <h4>{email}</h4>{" "}
        <h4> your current plan:{isUnlimited ? "Unlimited" : "free"}</h4>
      </ProfileCardContainer>
      <ButtonContainer>
        <button>edit</button> <button>delete</button>{" "}
      </ButtonContainer>
    </div>
  );
};

export default ProfileCard;
