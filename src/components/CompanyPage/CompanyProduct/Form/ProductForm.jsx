import React from "react";
import CompanyNavBar from "../../NavBar/CompanyNavBar";
import Form from "./style";
import { Slider, TextField } from "@mui/material";
import { useState } from "react";
const ProductForm = () => {
  const [productInfo, setProductInfo] = useState({
    productName: "",
    para1: 0,
    para2: "",
    para3: "",
  });
  const [productList, setProductList] = useState([]);
  return (
    <div>
      <CompanyNavBar />
      <h2>new product</h2>
      <Form>
        <TextField
          label="product name"
          value={productInfo.productName}
          onChange={(e) => {
            setProductInfo({ ...productInfo, productName: e.target.value });
          }}
        />
        <div>
          parameter1:
          <Slider
            aria-label="Small"
            valueLabelDisplay="auto"
            value={productInfo.para1}
            onChange={(e) => {
              setProductInfo({ ...productInfo, para1: e.target.value });
            }}
          />
        </div>
        <TextField
          label="parameter 2"
          value={productInfo.para2}
          onChange={(e) => {
            setProductInfo({ ...productInfo, para2: e.target.value });
          }}
        />
        <TextField
          label="parameter 3"
          value={productInfo.para3}
          onChange={(e) => {
            setProductInfo({ ...productInfo, para3: e.target.value });
          }}
        />
        <button
          onClick={() => {
            setProductList((productList) => [...productList, productInfo]);
            setProductInfo({ productName: "", para1: 0, para2: "", para3: "" });
            console.log(productList);
          }}
        >
          submit
        </button>
      </Form>
      {productList.map((item, index) => {
        return (
          <div key={index}>
            {" "}
            <h3>
              {item.productName} parameter1: {item.para1}, parameter2:{" "}
              {item.para2}, parameter3: {item.para3}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default ProductForm;
