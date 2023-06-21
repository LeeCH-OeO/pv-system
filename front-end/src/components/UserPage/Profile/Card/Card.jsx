import React from "react";
import {
  ProfileCardContainer,
  AvatarImage,
  UnlimitedAvatarImage,
} from "./style";
const ProfileCard = ({ name, email, isUnlimited, avatar }) => {
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
        <h4>{isUnlimited}</h4>
      </ProfileCardContainer>
    </div>
  );
};

export default ProfileCard;
