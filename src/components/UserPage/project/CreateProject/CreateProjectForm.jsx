import React from "react";
import Form from "./style";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";

import CancelIcon from "@mui/icons-material/Cancel";
const CreateProjectForm = () => {
  const [productList, setProductList] = useState([]);
  const [productSelectValue, setProductSelectValue] = useState({
    productType: "",
    lat: "",
    lon: "",
  });
  const handleOnClick = () => {
    setProductList((productList) => [...productList, productSelectValue]);
    setProductSelectValue({
      productType: "",
      lat: "",
      lon: "",
    });
  };
  const handleOnDelete = (index) => {
    const updatedList = [...productList];
    updatedList.splice(index, 1);
    setProductList(updatedList);
  };
  return (
    <div>
      <Form>
        <h2>New Project</h2>
        <div>
          <TextField label="Project Name"></TextField>
        </div>
        {productList.length !== 0 ? (
          productList.map((product, index) => {
            return (
              <div key={index}>
                <p>
                  {product.productType}, lat: {product.lat}, lon:{product.lon}
                </p>
                <IconButton
                  color="primary"
                  onClick={() => handleOnDelete(index)}
                >
                  <CancelIcon />
                </IconButton>
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
              setProductSelectValue({
                ...productSelectValue,
                productType: e.target.value,
              });
            }}
            defaultValue=""
          >
            <MenuItem value="product 1">Product 1</MenuItem>
            <MenuItem value="product 2">Product 2</MenuItem>
            <MenuItem value="product 3">Product 3</MenuItem>
          </Select>{" "}
          <TextField
            label="Latitude"
            required
            type="number"
            value={productSelectValue.lat}
            onChange={(e) =>
              setProductSelectValue({
                ...productSelectValue,
                lat: e.target.value,
              })
            }
          />
          <TextField
            label="Longitude"
            required
            type="number"
            value={productSelectValue.lon}
            onChange={(e) =>
              setProductSelectValue({
                ...productSelectValue,
                lon: e.target.value,
              })
            }
          />
          <button
            disabled={
              productSelectValue.productType &&
              productSelectValue.lat &&
              productSelectValue.lon
                ? false
                : true
            }
            onClick={handleOnClick}
          >
            add
          </button>
        </FormControl>
        <button
          onClick={() => {
            console.log(productList);
          }}
        >
          submit
        </button>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
