import React from "react";
import CreateProjectForm from "./CreateProjectForm";
import UserNavBar from "../../NavBar/UserNavBar";
import ProjectMap from "./ProjectMap/ProjectMap";
import { useEffect, useState } from "react";
const CreateProjectPage = () => {
  return (
    <>
      <UserNavBar />
      <CreateProjectForm />
      <div id="CreateProjectMap">
        <ProjectMap />
      </div>
    </>
  );
};

export default CreateProjectPage;
