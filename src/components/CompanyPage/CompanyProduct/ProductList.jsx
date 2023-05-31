import React from "react";
import CompanyNavBar from "../NavBar/CompanyNavBar";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const ProductList = () => {
  const navigate = useNavigate();
  const [mockList, setMockList] = useState([
    { name: "product1", para1: 10, para2: 20, para3: 40 },
    { name: "product2", para1: 11, para2: 22, para3: 33 },
    { name: "product3", para1: 12, para2: 23, para3: 44 },
  ]);
  const handleOnDelete = (index) => {
    const updatedList = [...mockList];
    updatedList.splice(index, 1);
    setMockList(updatedList);
    console.log(mockList);
  };
  return (
    <div>
      <CompanyNavBar />
      <h2>Product list</h2>
      <button
        onClick={() => {
          navigate("/company/new-product/");
        }}
      >
        create new product
      </button>
      {mockList.map((item, index) => {
        return (
          <div key={index}>
            <ProductItem
              key={index}
              name={item.name}
              para1={item.para1}
              para2={item.para2}
              para3={item.para3}
            />
            <button
              onClick={() => {
                handleOnDelete(index);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
