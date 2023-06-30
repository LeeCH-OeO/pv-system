import React from "react";
import CompanyNavBar from "../NavBar/CompanyNavBar";
import { useState, useEffect } from "react";
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
import axios from "axios";
import { TextField } from "@mui/material";
const ProductList = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          url: "http://127.0.0.1:1212/api/companyproduct/company-list",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
          },
        });
        console.log(res.data);
        setProductList(res.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const [productList, setProductList] = useState([]);
  const [productInfo, setProductInfo] = useState({
    productName: "",
    area: "",
    tilt: "",
    orientation: "",
    index: "",
    powerPeak: "",
    systemLoss: "",
  });
  const handleOnDelete = async (index) => {
    try {
      const res = await axios({
        method: "delete",
        url: "http://127.0.0.1:1212/api/companyproduct/delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
        },
        data: { id: productList[index]._id },
      });
      if (res) {
        const updatedList = [...productList];
        updatedList.splice(index, 1);
        setProductList(updatedList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleUpdate = (product, index) => {
    setProductInfo({ ...product, index: index });
    setShowEditModal(true);
    console.log("handleupdate: ", product);
  };
  const saveUpdate = async () => {
    console.log("save update", productInfo);
    try {
      const res = await axios({
        method: "patch",
        url: "http://127.0.0.1:1212/api/companyproduct/update",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
        },
        data: { data: { productInfo }, id: productInfo._id },
      });
      if (res) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setProductInfo({
        productName: "",
        area: "",
        tilt: "",
        orientation: "",
        index: "",
      });
    }
  };
  const saveNewProduct = async () => {
    try {
      await axios({
        method: "post",
        url: "http://127.0.0.1:1212/api/companyproduct/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
        },
        data: productInfo,
      });

      window.location.reload();
    } catch (error) {
      alert("Product name already exist");
      console.log(error);
      setProductInfo({
        productName: "",
        area: "",
        tilt: "",
        orientation: "",
        index: "",
        powerPeak: "",
        systemLoss: "",
      });
    }
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

        {productList.length === 0 ? (
          <TitleContainer>
            <h3>Create your new product</h3>
          </TitleContainer>
        ) : (
          <ProductListContainer>
            {productList.map((item, index) => {
              return (
                <ProductItemContainer key={index}>
                  <ProductItem>
                    <h3>
                      {item.productName} <br />
                      Orientation: {item.orientation} deg
                      <br />
                      Area: {item.area} m²
                      <br />
                      Tilt:{item.tilt} deg
                      <br />
                      powerPeak:{item.powerPeak} watt
                      <br />
                      system loss: {item.systemLoss} %
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
        )}
      </ProductListPageContainer>
      {showEditModal && (
        <DialogOverlay>
          <DialogContainer open onClose={() => setShowEditModal(false)}>
            <h2>Update {productInfo.productName} </h2>

            <TextField
              label="area (m²)"
              margin="dense"
              value={productInfo.area}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
                  area: Number(e.target.value),
                });
              }}
            />
            <TextField
              label="tilt (deg)"
              margin="dense"
              value={productInfo.tilt}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
                  tilt: Number(e.target.value),
                });
              }}
            />
            <TextField
              margin="dense"
              label="orientation (deg)"
              value={productInfo.orientation}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
                  orientation: Number(e.target.value),
                });
              }}
            />
            <TextField
              label="powerPeak (watt)"
              margin="dense"
              type="number"
              value={productInfo.powerPeak}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
                  powerPeak: Number(e.target.value),
                });
              }}
            />
            <TextField
              label="system lose (%)"
              margin="dense"
              type="number"
              value={productInfo.systemLoss}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
                  systemLoss: Number(e.target.value),
                });
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
                  !productInfo.orientation ||
                  !productInfo.powerPeak
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
            <h2>Create your new product </h2>
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
              type="number"
              value={productInfo.area}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
                  area: Number(e.target.value),
                });
              }}
            />
            <TextField
              label="tilt (deg)"
              margin="dense"
              type="number"
              value={productInfo.tilt}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
                  tilt: Number(e.target.value),
                });
              }}
            />
            <TextField
              margin="dense"
              label="orientation (deg)"
              value={productInfo.orientation}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
                  orientation: Number(e.target.value),
                });
              }}
            />
            <TextField
              label="powerPeak (watt)"
              margin="dense"
              type="number"
              value={productInfo.powerPeak}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
                  powerPeak: Number(e.target.value),
                });
              }}
            />
            <TextField
              label="system lose (%)"
              margin="dense"
              type="number"
              value={productInfo.systemLoss}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
                  systemLoss: Number(e.target.value),
                });
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
                    powerPeak: "",
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
                  !productInfo.orientation ||
                  !productInfo.powerPeak
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
