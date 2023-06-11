import { TextField } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
} from "react-leaflet";
const ProjectMap = ({ height, width, center, products }) => {
  const [productList, setProductList] = useState(products);
  const [addProductItem, setAddProductItem] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  productList.map((item, index) => {
    item.id = index;
  });
  const handleOnDelete = (index) => {
    const updatedList = [...productList];
    updatedList.splice(index, 1);
    setProductList(updatedList);
  };
  useEffect(() => {
    console.log("effect", productList);
  }, [productList]);
  const ClickMarker = () => {
    const map = useMapEvent("click", (e) => {
      setAddProductItem({ lat: e.latlng.lat, lng: e.latlng.lng });
      setShowAddForm(true);
    });
  };
  const addProduct = () => {
    setProductList([
      ...productList,
      { location: { lat: addProductItem.lat, lng: addProductItem.lng } },
    ]);
    productList.map((item, index) => {
      item.id = index;
    });
    setAddProductItem({});
    setShowAddForm(false);
  };
  const editProduct = () => {};
  // const handleEdit = (index) => {
  //   const updatedList = [...productList];
  //   setShowAddForm(true);
  //   console.log(updatedList[index]);
  //   setInputLocation({
  //     lat: updatedList[index].location.lat,
  //     lng: updatedList[index].location.lng,
  //   });
  //   updatedList[index] = {
  //     ...updatedList[index],
  //     location: { lat: inputLocation.lat, lng: inputLocation.lng },
  //   };
  // };
  return (
    <>
      <MapContainer
        on
        style={{ width: `${width}`, height: `${height}` }}
        center={[center.lat, center.lng]}
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
              <Popup eventHandlers={{}}>
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
                      handleEdit(index);
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
      {showAddForm && (
        <div>
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
    </>
  );
};

export default ProjectMap;
