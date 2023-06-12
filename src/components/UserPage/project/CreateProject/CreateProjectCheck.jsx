import React from "react";
import { CreateProjectCheckContainer } from "./style";

const CreateProjectCheck = () => {
  const storedJsonStr = localStorage.getItem("newProject");

  // Parse the JSON string into an object
  const storedObject = JSON.parse(storedJsonStr);
  return (
    <CreateProjectCheckContainer>
      <h2>Check the following detail</h2>
      <p>project Name: {storedObject.projectName}</p>
      {storedObject.products.map((item, index) => {
        return (
          <p key={index}>
            lat:{item.location.lat}, lng:{item.location.lon}
          </p>
        );
      })}
    </CreateProjectCheckContainer>
  );
};

export default CreateProjectCheck;
