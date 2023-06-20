import React from "react";
import CompanyNavBar from "../NavBar/CompanyNavBar";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ProductListContainer,
  ProductListPageContainer,
  DialogContainer,
  DialogOverlay,
} from "./style";
import { TextField } from "@mui/material";
const ProductList = () => {
  const [tempList, setTempList] = useState([
    { productName: "product1", area: 110, tilt: 20, orientation: 40 },
    { productName: "product12", area: 120, tilt: 20, orientation: 40 },
    { productName: "product13", area: 130, tilt: 20, orientation: 40 },
  ]);
  const [productInfo, setProductInfo] = useState({
    productName: "",
    area: "",
    tilt: "",
    orientation: "",
    index: "",
  });
  const handleOnDelete = (index) => {
    const updatedList = [...tempList];
    updatedList.splice(index, 1);
    setTempList(updatedList);
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleUpdate = (product, index) => {
    setProductInfo({ ...product, index: index });
    setShowEditModal(true);
  };
  const saveUpdate = () => {
    const updatedList = [...tempList];
    updatedList[productInfo.index] = productInfo;
    setTempList(updatedList);
    console.log(updatedList[productInfo.index]);
    setShowEditModal(false);
  };
  const saveNewProduct = () => {
    setTempList([...tempList, productInfo]);
    setShowCreateModal(false);
    setProductInfo({
      productName: "",
      area: "",
      tilt: "",
      orientation: "",
      index: "",
    });
  };
  return (
    <>
      <CompanyNavBar />
      <ProductListPageContainer>
        <h2>Product list</h2>
        <button
          onClick={() => {
            setShowCreateModal(true);
          }}
        >
          create new product
        </button>
        <ProductListContainer>
          {tempList.map((item, index) => {
            return (
              <div key={index}>
                <ProductItem
                  key={index}
                  name={item.productName}
                  para1={item.area}
                  para2={item.orientation}
                  para3={item.tilt}
                />
                <button
                  onClick={() => {
                    handleOnDelete(index);
                  }}
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    handleUpdate(item, index);
                  }}
                >
                  update
                </button>
              </div>
            );
          })}
        </ProductListContainer>
      </ProductListPageContainer>
      {showEditModal && (
        <DialogOverlay>
          <DialogContainer open onClose={() => setShowEditModal(false)}>
            <h2>Update Your product </h2>
            <TextField
              label="product name"
              margin="dense"
              value={productInfo.productName}
              onChange={(e) => {
                setProductInfo({ ...productInfo, productName: e.target.value });
              }}
            />

            <TextField
              label="area (m²)"
              margin="dense"
              value={productInfo.area}
              onChange={(e) => {
                setProductInfo({ ...productInfo, area: e.target.value });
              }}
            />
            <TextField
              label="tilt"
              margin="dense"
              value={productInfo.tilt}
              onChange={(e) => {
                setProductInfo({ ...productInfo, tilt: e.target.value });
              }}
            />
            <TextField
              margin="dense"
              label="orientation"
              value={productInfo.orientation}
              onChange={(e) => {
                setProductInfo({ ...productInfo, orientation: e.target.value });
              }}
            />
            <div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setProductInfo({
                    productName: "",
                    area: "",
                    tilt: "",
                    orientation: "",
                  });
                }}
              >
                cancel
              </button>
              <button
                disabled={
                  !productInfo.productName ||
                  !productInfo.area ||
                  !productInfo.tilt ||
                  !productInfo.orientation
                }
                onClick={() => saveUpdate()}
              >
                save
              </button>
            </div>
          </DialogContainer>
        </DialogOverlay>
      )}

      {showCreateModal && (
        <DialogOverlay>
          <DialogContainer open onClose={() => setShowCreateModal(false)}>
            <h2>Create Your new product </h2>
            <TextField
              label="product name"
              margin="dense"
              value={productInfo.productName}
              onChange={(e) => {
                setProductInfo({ ...productInfo, productName: e.target.value });
              }}
            />

            <TextField
              label="area (m²)"
              margin="dense"
              value={productInfo.area}
              onChange={(e) => {
                setProductInfo({ ...productInfo, area: e.target.value });
              }}
            />
            <TextField
              label="tilt"
              margin="dense"
              value={productInfo.tilt}
              onChange={(e) => {
                setProductInfo({ ...productInfo, tilt: e.target.value });
              }}
            />
            <TextField
              margin="dense"
              label="orientation"
              value={productInfo.orientation}
              onChange={(e) => {
                setProductInfo({ ...productInfo, orientation: e.target.value });
              }}
            />
            <div>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setProductInfo({
                    productName: "",
                    area: "",
                    tilt: "",
                    orientation: "",
                  });
                }}
              >
                cancel
              </button>
              <button
                disabled={
                  !productInfo.productName ||
                  !productInfo.area ||
                  !productInfo.tilt ||
                  !productInfo.orientation
                }
                onClick={() => saveNewProduct()}
              >
                save
              </button>
            </div>
          </DialogContainer>
        </DialogOverlay>
      )}
    </>
  );
};

export default ProductList;
