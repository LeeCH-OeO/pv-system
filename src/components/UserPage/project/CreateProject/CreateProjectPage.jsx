import React from "react";
import CreateProjectForm from "./CreateProjectForm";
import UserNavBar from "../../NavBar/UserNavBar";
const CreateProjectPage = () => {
  return (
    <div>
      <UserNavBar />
      <h2>Create your new Project</h2>
      <CreateProjectForm />
    </div>
  );
};

export default CreateProjectPage;
