import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProjectMap from "../ProjectMap/ProjectMap";
const ProjectDetail = () => {
  const location = useLocation();
  const [projectInfo, setProjectInfo] = useState(location.state.projectInfo);
  console.log(projectInfo);
  return (
    <div>
      <ProjectMap
        products={projectInfo.products}
        projectName={projectInfo.projectName}
      />
    </div>
  );
};

export default ProjectDetail;
