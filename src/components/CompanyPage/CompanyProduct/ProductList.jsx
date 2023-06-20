import React from "react";
import CompanyNavBar from "../NavBar/CompanyNavBar";
import { useState } from "react";
import {
  ProductListContainer,
  ProductListPageContainer,
  DialogContainer,
  DialogOverlay,
  ProductItem,
  ProductItemButtonContainer,
  ProductItemContainer,
  IconButton,
  ModalButtonContainer,
  FabButton,
  TitleContainer,
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
    setProductInfo({
      productName: "",
      area: "",
      tilt: "",
      orientation: "",
      index: "",
    });
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
      <FabButton
        onClick={() => {
          setShowCreateModal(true);
        }}
      >
        <span class="material-icons">add</span>
      </FabButton>
      <ProductListPageContainer>
        <TitleContainer>
          <h2>Product list</h2>
        </TitleContainer>

        <ProductListContainer>
          {tempList.map((item, index) => {
            return (
              <ProductItemContainer>
                <ProductItem key={index}>
                  <h3>
                    {item.productName} <br />
                    Orientation: {item.orientation}
                    <br />
                    Area: {item.area}
                    <br />
                    Tilt:{item.tilt}
                  </h3>
                </ProductItem>
                <ProductItemButtonContainer>
                  <IconButton
                    onClick={() => {
                      handleOnDelete(index);
                    }}
                  >
                    <span class="material-icons">delete</span>
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      handleUpdate(item, index);
                    }}
                  >
                    <span class="material-icons">edit</span>
                  </IconButton>
                </ProductItemButtonContainer>
              </ProductItemContainer>
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
            <ModalButtonContainer>
              <IconButton
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
                <span class="material-icons">cancel</span>
              </IconButton>
              <IconButton
                disabled={
                  !productInfo.productName ||
                  !productInfo.area ||
                  !productInfo.tilt ||
                  !productInfo.orientation
                }
                onClick={() => saveUpdate()}
              >
                <span class="material-icons">save</span>
              </IconButton>
            </ModalButtonContainer>
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
            <ModalButtonContainer>
              <IconButton
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
                <span class="material-icons">cancel</span>
              </IconButton>
              <IconButton
                disabled={
                  !productInfo.productName ||
                  !productInfo.area ||
                  !productInfo.tilt ||
                  !productInfo.orientation
                }
                onClick={() => saveNewProduct()}
              >
                <span class="material-icons">save</span>
              </IconButton>
            </ModalButtonContainer>
          </DialogContainer>
        </DialogOverlay>
      )}
    </>
  );
};

export default ProductList;
