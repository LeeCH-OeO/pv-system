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
const EditCardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
`;
const EditFormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-color: green;
  width: 30%;
  @media (max-width: 800px) {
    width: 80%;
  }
  height: 20vh;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 1rem;
`;
export {
  ProfileCardContainer,
  AvatarImage,
  ButtonContainer,
  EditCardContainer,
  EditFormContainer,
};
