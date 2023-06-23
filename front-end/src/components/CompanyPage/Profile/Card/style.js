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

  width: 30%;
  @media (max-width: 800px) {
    width: 80%;
  }
  height: 20vh;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  background-color: #3498db;
  color: #fff;
  border: none;
  text-transform: uppercase;
  border-radius: 10px; /* Adjust the value to change the roundness */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

export {
  ProfileCardContainer,
  AvatarImage,
  ButtonContainer,
  EditCardContainer,
  EditFormContainer,
  Button,
};
