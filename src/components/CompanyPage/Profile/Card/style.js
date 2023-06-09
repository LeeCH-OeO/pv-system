import styled, { keyframes } from "styled-components";

const ProfileCardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
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
export { ProfileCardContainer, AvatarImage, ButtonContainer };
