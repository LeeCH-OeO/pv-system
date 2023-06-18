import styled, { keyframes } from "styled-components";
const ProjectListContainer = styled.div`
  text-align: center;
  padding: 0.5rem;
`;
const ActiveProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
`;
const ProjectItem = styled.div`
  padding: 1rem;
`;
const OldProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  background-color: lightgray;
`;
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Loader = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

export {
  ActiveProjectContainer,
  ProjectListContainer,
  OldProjectContainer,
  ProjectItem,
  LoaderContainer,
  Loader,
};
