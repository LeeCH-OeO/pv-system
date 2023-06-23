import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProjectMap from "../ProjectMap/ProjectMap";
const ProjectDetail = () => {
  const location = useLocation();

  return (
    <div>
      <ProjectMap
        products={location.state.projectInfo}
        projectID={location.state.projectID}
        projectName={location.state.projectName}
      />
    </div>
  );
};

export default ProjectDetail;
