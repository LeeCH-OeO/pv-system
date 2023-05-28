import React from "react";
import CreateProjectForm from "./style";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import { useState } from "react";
const CreateProject = () => {
  const [productList, setProductList] = useState([]);
  const [productSelectValue, setProductSelectValue] = useState("");
  const handleOnClick = () => {
    setProductList((productList) => [...productList, productSelectValue]);
  };
  const handleOnDelete = (index) => {
    const updatedArray = [...productList];
    updatedArray.splice(index, 1);
    setProductList(updatedArray);
  };
  return (
    <div>
      <CreateProjectForm>
        <h2>New Project</h2>
        <div>
          <TextField label="Project Name"></TextField>
        </div>
        {productList.length !== 0 ? (
          productList.map((product, index) => {
            return (
              <div>
                <p>{product}</p>
                <button onClick={() => handleOnDelete(index)}>delete</button>
              </div>
            );
          })
        ) : (
          <p>no product</p>
        )}
        <FormControl sx={{ m: 1, minWidth: 120 }} variant="filled">
          <InputLabel id="product-list">products</InputLabel>
          <Select
            labelId="product-list"
            onChange={(e) => {
              setProductSelectValue(e.target.value);
            }}
            defaultValue=""
          >
            <MenuItem value="product 1">Product 1</MenuItem>
            <MenuItem value="product 2">Product 2</MenuItem>
            <MenuItem value="product 3">Product 3</MenuItem>
          </Select>{" "}
          <button onClick={handleOnClick}>add</button>
        </FormControl>
      </CreateProjectForm>
    </div>
  );
};

export default CreateProject;
