import React from "react";
import ProjectMap from "../ProjectMap";
import {
  ProjectListContainer,
  ProjectContainer,
  ProjectInfoContainer,
} from "./style";
const ProjectList = () => {
  return (
    <div>
      <h1>Project list</h1>
      <ProjectListContainer>
        <ProjectContainer>
          <h3>first project</h3>
          <ProjectInfoContainer>
            <ProjectMap
              height="40vh"
              width="60vw"
              center={{ lat: "25.033288077484567", lng: "121.56134442986864" }}
            />
            <p>some info</p>
          </ProjectInfoContainer>
        </ProjectContainer>
        <ProjectContainer>
          <h3>second project</h3>
          <ProjectInfoContainer>
            <ProjectMap
              height="40vh"
              width="80vw"
              center={{ lat: "29.790997667390602", lng: "-95.42082544600602" }}
            />
          </ProjectInfoContainer>
        </ProjectContainer>
        <ProjectContainer>
          <h3>third project</h3>
          <ProjectInfoContainer>
            <ProjectMap
              height="40vh"
              width="80vw"
              center={{ lat: "52.52354266184729", lng: "13.402872545835251" }}
            />
          </ProjectInfoContainer>
        </ProjectContainer>
      </ProjectListContainer>
    </div>
  );
};

export default ProjectList;
