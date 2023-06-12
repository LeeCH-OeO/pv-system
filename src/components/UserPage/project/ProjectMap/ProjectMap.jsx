import { TextField } from "@mui/material";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
} from "react-leaflet";
import UserNavBar from "../../NavBar/UserNavBar";
import { DetailContainer, SideContainer } from "./style";
const ProjectMap = ({ products, projectName }) => {
  const [productList, setProductList] = useState(products);
  const [addProductItem, setAddProductItem] = useState({ lat: "", lng: "" });
  const [editProductItem, setEditProductItem] = useState({});
  const [showAddForm, setShowAddForm] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  productList.map((item, index) => {
    item.id = index;
  });
  const tempRef = useRef(null);
  const closePopup = () => {
    tempRef.current._popup._closeButton.click();
  };
  const handleOnDelete = (index) => {
    const updatedList = [...productList];
    updatedList.splice(index, 1);
    setProductList(updatedList);
    closePopup();
  };
  useEffect(() => {
    console.log("effect", productList);
  }, [productList]);
  const ClickMarker = () => {
    const map = useMapEvent("contextmenu", (e) => {
      setAddProductItem({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
      setShowEditForm(false);
      setShowAddForm(true);
    });
  };
  const addProduct = () => {
    setProductList([
      ...productList,
      {
        location: {
          lat: addProductItem.lat.toString(),
          lng: addProductItem.lng.toString(),
        },
      },
    ]);
    productList.map((item, index) => {
      item.id = index;
    });
    setAddProductItem({ lat: "", lng: "" });
  };
  const handleEdit = (lat, lng, index) => {
    setShowEditForm(true);
    setShowAddForm(false);
    setEditProductItem({ lat: lat, lng: lng, index: index });
    closePopup();
  };
  const addEditProductItem = () => {
    console.log(editProductItem);
    const updatedList = [...productList];
    updatedList[editProductItem.index] = {
      ...updatedList[editProductItem],
      location: {
        lat: editProductItem.lat.toString(),
        lng: editProductItem.lng.toString(),
      },
      id: editProductItem.index,
    };
    setProductList(updatedList);
    setShowEditForm(false);
    setShowAddForm(true);
  };
  return (
    <>
      <UserNavBar />
      <DetailContainer>
        <MapContainer
          ref={tempRef}
          style={{ width: "80vw", height: "100vh" }}
          center={[39.0, 34.0]}
          zoom={2}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ClickMarker />
          {productList.map((product, index) => {
            return (
              <Marker
                position={[product.location.lat, product.location.lng]}
                key={index}
              >
                <Popup>
                  <div>
                    <p>{`lat: ${product.location.lat}, lng: ${product.location.lng}, product type:${product.productType}`}</p>{" "}
                    <button
                      onClick={() => {
                        handleOnDelete(index);
                      }}
                    >
                      delete
                    </button>
                    <button
                      onClick={() => {
                        handleEdit(
                          product.location.lat,
                          product.location.lng,
                          index
                        );
                      }}
                    >
                      edit
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        <SideContainer>
          {showAddForm && (
            <div>
              <p>add new product</p>
              <TextField
                label="lan"
                type="number"
                value={addProductItem.lat}
                onChange={(e) => {
                  setAddProductItem({ ...addProductItem, lat: e.target.value });
                }}
              />
              <TextField
                label="lng"
                type="number"
                value={addProductItem.lng}
                onChange={(e) => {
                  setAddProductItem({ ...addProductItem, lng: e.target.value });
                }}
              />
              <button onClick={() => addProduct()}>submit</button>
            </div>
          )}
          {showEditForm && (
            <div>
              <p>edit product</p>
              <TextField
                label="lan"
                type="number"
                value={editProductItem.lat}
                onChange={(e) => {
                  setEditProductItem({
                    ...editProductItem,
                    lat: e.target.value,
                  });
                }}
              />
              <TextField
                label="lng"
                type="number"
                value={editProductItem.lng}
                onChange={(e) => {
                  setEditProductItem({
                    ...editProductItem,
                    lng: e.target.value,
                  });
                }}
              />
              <button onClick={() => addEditProductItem()}>submit</button>
            </div>
          )}
        </SideContainer>
      </DetailContainer>
    </>
  );
};

export default ProjectMap;
