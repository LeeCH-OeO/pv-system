import React from "react";
import CreateProjectForm from "./CreateProjectForm";
import UserNavBar from "../../NavBar/UserNavBar";
import ProjectMap from "./ProjectMap/ProjectMap";
import CreateProjectCheck from "./CreateProjectCheck";
const CreateProjectPage = () => {
  return (
    <>
      <UserNavBar />
      <CreateProjectForm />
      <div id="CreateProjectMap">
        <ProjectMap />
      </div>
      <div id="CreateProjectCheck">
        {" "}
        <CreateProjectCheck />
      </div>
    </>
  );
};

export default CreateProjectPage;
