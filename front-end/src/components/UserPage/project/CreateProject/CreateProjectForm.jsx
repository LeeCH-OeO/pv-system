import React from "react";
import {
  Form,
  ProductList,
  ProductListText,
  FormContainer,
  SearchContainer,
  LocationContainer,
  RoundButton,
  TextButton,
} from "./style";

import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
const CreateProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const handleClick = async () => {
    const component = document.getElementById("CreateProjectMap");
    component.scrollIntoView({ behavior: "smooth" });
    const jsonStr = JSON.stringify({ projectName: projectName });

    // Store the JSON string in localStorage
    localStorage.setItem("newProject", jsonStr);

    try {
      const respond = await axios({
        url: "http://127.0.0.1:1212/api/project/create",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: { projectName: projectName, isActive: true },
      });
      console.log(respond.data.projectID);
      localStorage.setItem("newProjectID", respond.data.projectID);
    } catch (error) {
      console.log("error", error);
      setProjectName("");
      alert("Project name already exist");
    }
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
      <TextButton
        disabled={!projectName}
        onClick={() => {
          handleClick();
        }}
      >
        next step
      </TextButton>
    </FormContainer>
  );
};

export default CreateProjectForm;
