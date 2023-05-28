import styled from "styled-components";
const ProjectListContainer = styled.div`
  text-align: center;
  padding: 0.5rem;
`;
const ProjectContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-color: green;
  padding-bottom: 10px;
  margin: 20px;
  border-radius: 5px;
`;
const ProjectInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
export { ProjectContainer, ProjectListContainer, ProjectInfoContainer };
