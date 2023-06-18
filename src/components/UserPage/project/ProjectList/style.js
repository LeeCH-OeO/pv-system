import styled from "styled-components";
const ProjectListContainer = styled.div`
  text-align: center;
  padding: 0.5rem;
`;
const ActiveProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  border-style: solid;
  border-color: green;
  padding-bottom: 10px;
  margin-bottom: 5vh;
  border-radius: 5px;
`;
const ProjectItem = styled.div`
  padding: 1rem;
`;
const OldProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  border-style: dashed;
  border-color: black;
  padding-bottom: 10px;
  margin-bottom: 5vh;
  border-radius: 5px;
  background-color: lightgray;
`;
export {
  ActiveProjectContainer,
  ProjectListContainer,
  OldProjectContainer,
  ProjectItem,
};
