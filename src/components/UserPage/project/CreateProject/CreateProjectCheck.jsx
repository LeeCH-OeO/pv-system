import React from "react";
import { CreateProjectCheckContainer } from "./style";
import { useState } from "react";
const CreateProjectCheck = () => {
  // const [storeObject, setStoredObject] = useState({});
  // const storedJsonStr = localStorage.getItem("newProject");

  // // Parse the JSON string into an object
  // setStoredObject(JSON.parse(storedJsonStr));

  return (
    <CreateProjectCheckContainer>
      <h2>Check the following detail</h2>
      {/* <p>project Name: {storeObject.projectName}</p> */}

      {/* {storeObject?.products.map((item, index) => {
        return (
          <p key={index}>
            lat:{item.location.lat}, lng:{item.location.lon}
          </p>
        );
      })} */}
    </CreateProjectCheckContainer>
  );
};

export default CreateProjectCheck;
