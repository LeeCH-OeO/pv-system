import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ProjectMap from "../ProjectMap/ProjectMap";
const ProjectDetail = () => {
  const location = useLocation();
  const [projectInfo, setProjectInfo] = useState(location.state.projectInfo);

  return (
    <div>
      <ProjectMap
        height="80vh"
        width="85vw"
        center={{ lat: "52.52354266184729", lng: "13.402872545835251" }}
        products={projectInfo.products}
      />
    </div>
  );
};

export default ProjectDetail;
