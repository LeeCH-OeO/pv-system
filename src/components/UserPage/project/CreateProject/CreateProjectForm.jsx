import React from "react";
import {
  Form,
  ProductList,
  ProductListText,
  FormContainer,
  SearchContainer,
  LocationContainer,
  RoundButton,
} from "./style";

import { TextField } from "@mui/material";
import { useState } from "react";

const CreateProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const handleClick = () => {
    const component = document.getElementById("CreateProjectMap");
    component.scrollIntoView({ behavior: "smooth" });
    const jsonStr = JSON.stringify({ projectName: projectName });

    // Store the JSON string in localStorage
    localStorage.setItem("newProject", jsonStr);
  };

  return (
    <FormContainer>
      <Form>
        <h2>New Project</h2>
        <div>
          <TextField
            label="Project Name"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          ></TextField>
        </div>
      </Form>
      <button
        disabled={!projectName}
        onClick={() => {
          console.log(projectName);
          handleClick();
        }}
      >
        next step
      </button>
    </FormContainer>
  );
};

export default CreateProjectForm;
