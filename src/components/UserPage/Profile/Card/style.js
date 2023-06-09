import styled, { keyframes } from "styled-components";

const ProfileCardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
`;
const blinkAnimation = keyframes`
  0% {
    border-color: transparent;
  }
  50% {
    border-color: red;
  }
  100% {
    border-color: transparent;
  }
`;
const UnlimitedAvatarImage = styled.img`
  margin: none;
  width: 100px;
  border-radius: 50%;
  border: 3px solid transparent;
  animation: ${blinkAnimation} 3s infinite;
`;
const AvatarImage = styled.img`
  margin: none;
  width: 100px;
  border-radius: 50%;
  border: 3px solid;
  border-color: blue;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const EditCardContainer = styled.div`
  text-align: center;
  border: 1px solid gray;
  padding: 1rem;
  margin: 1rem;
`;
export {
  ProfileCardContainer,
  UnlimitedAvatarImage,
  AvatarImage,
  ButtonContainer,
  EditCardContainer,
};
