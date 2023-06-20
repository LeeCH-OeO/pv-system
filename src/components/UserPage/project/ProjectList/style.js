import styled, { keyframes, css } from "styled-components";
const ProjectListContainer = styled.div`
  text-align: center;
  padding: 0.5rem;
`;
const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
`;
const ProjectItem = styled.div`
  padding: 1rem;
`;
const PorjectItemContainer = styled.div`
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const OldProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  background-color: gray;
`;
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;
const TextButton = styled.button`
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 6px 12px;
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
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: not-allowed;
    `}
`;
const ButtonContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-around;
`;
const Loader = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;
const FabButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: ${(props) => (props.secondary ? "100px" : "20px")};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${(props) => (props.secondary ? "#2196f3" : "#f44336")};
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
const IconButton = styled.button`
  display: inline-block;
  padding: 3px 6px;
  margin-left: 1px;
  margin-right: 1px;
  text-align: center;
  text-decoration: none;
  background-color: ${(props) => (props.disabled ? "gray" : "lightblue")};
  color: #fff;
  border: none;
  text-transform: uppercase;
  border-radius: 5px; /* Adjust the value to change the roundness */
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => !props.disabled && "CornflowerBlue"};
  }
`;
const ProjectButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export {
  ProjectContainer,
  ProjectListContainer,
  OldProjectContainer,
  ProjectItem,
  LoaderContainer,
  Loader,
  TitleContainer,
  TextButton,
  ButtonContainer,
  PorjectItemContainer,
  FabButton,
  IconButton,
  ProjectButtonContainer,
};
