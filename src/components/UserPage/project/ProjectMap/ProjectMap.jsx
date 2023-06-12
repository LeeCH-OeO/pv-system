import { IconButton, TextField } from "@mui/material";
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
import { DialogOverlay, DialogContainer } from "./NewProductModal";
import { DetailContainer, FloatingActionButton } from "./style";
import FetchGeo from "../CreateProject/CityNameToLocation";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
const ProjectMap = ({ products, projectName }) => {
  const [productList, setProductList] = useState(products);
  const [addProductItem, setAddProductItem] = useState({ lat: "", lon: "" });
  const [editProductItem, setEditProductItem] = useState({ lat: "", lon: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [searchText, setSearchtext] = useState("");
  const handleAddFormSearch = async (input) => {
    const result = await FetchGeo(input);
    try {
      console.log(result.data[0].lat, result.data[0].lon);
      setAddProductItem({
        ...addProductItem,
        lat: result.data[0].lat,
        lon: result.data[0].lon,
      });
      setSearchtext("");
    } catch (error) {
      console.log(error);
      alert("location not found!");
      setSearchtext("");
    }
  };
  productList.map((item, index) => {
    item.id = index;
  });
  const mapRef = useRef(null);
  const closePopup = () => {
    mapRef.current._popup._closeButton.click();
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
        lon: e.latlng.lng,
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
          lon: addProductItem.lon.toString(),
        },
      },
    ]);
    productList.map((item, index) => {
      item.id = index;
    });
    setAddProductItem({ lat: "", lon: "" });
    setShowAddForm(false);
  };
  const handleEdit = (lat, lon, index) => {
    setShowEditForm(true);
    setShowAddForm(false);
    setEditProductItem({ lat: lat, lon: lon, index: index });
    console.log(mapRef.current._panes);
    closePopup();
  };
  const addEditProductItem = () => {
    console.log(editProductItem);
    const updatedList = [...productList];
    updatedList[editProductItem.index] = {
      ...updatedList[editProductItem],
      location: {
        lat: editProductItem.lat.toString(),
        lon: editProductItem.lon.toString(),
      },
      id: editProductItem.index,
    };
    setProductList(updatedList);
    setShowEditForm(false);
    setShowAddForm(false);
  };
  return (
    <>
      <UserNavBar />
      <DetailContainer>
        <MapContainer
          ref={mapRef}
          style={{ width: "90vw", height: "90vh", overflowY: "hidden" }}
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
                position={[product.location.lat, product.location.lon]}
                key={index}
              >
                <Popup>
                  <div>
                    <p>{`lat: ${product.location.lat}, lon: ${product.location.lon}, product type:${product.productType}`}</p>{" "}
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
                          product.location.lon,
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
        {showAddForm && (
          <DialogOverlay>
            <DialogContainer open onClose={() => setShowAddForm(false)}>
              <p>add new product</p>
              <TextField
                label="Latitude"
                type="number"
                margin="dense"
                value={addProductItem.lat}
                onChange={(e) => {
                  setAddProductItem({ ...addProductItem, lat: e.target.value });
                }}
              />
              <TextField
                label="Longitude"
                type="number"
                margin="dense"
                value={addProductItem.lon}
                onChange={(e) => {
                  setAddProductItem({ ...addProductItem, lon: e.target.value });
                }}
              />
              <TextField
                value={searchText}
                onChange={(e) => setSearchtext(e.target.value)}
                label="search"
              />
              <IconButton
                disabled={!searchText}
                color="primary"
                onClick={() => handleAddFormSearch(searchText)}
              >
                <TravelExploreIcon />
              </IconButton>
              <button
                disabled={!addProductItem.lat || !addProductItem.lon}
                onClick={() => addProduct()}
              >
                submit
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setAddProductItem({ lat: "", lon: "" });
                }}
              >
                cancel
              </button>
            </DialogContainer>
          </DialogOverlay>
        )}
        {showEditForm && (
          <DialogOverlay>
            <DialogContainer open onClose={() => setShowEditForm(false)}>
              <p>edit product</p>
              <TextField
                label="Latitude"
                type="number"
                margin="dense"
                value={editProductItem.lat}
                onChange={(e) => {
                  setEditProductItem({
                    ...editProductItem,
                    lat: e.target.value,
                  });
                }}
              />
              <TextField
                label="Longitude"
                type="number"
                margin="dense"
                value={editProductItem.lon}
                onChange={(e) => {
                  setEditProductItem({
                    ...editProductItem,
                    lon: e.target.value,
                  });
                }}
              />
              <button onClick={() => addEditProductItem()}>submit</button>
              <button onClick={() => setShowEditForm(false)}> cancel</button>
            </DialogContainer>
          </DialogOverlay>
        )}

        <FloatingActionButton
          disabled={showAddForm || showEditForm}
          onClick={() => setShowAddForm(true)}
        >
          +
        </FloatingActionButton>
      </DetailContainer>
    </>
  );
};

export default ProjectMap;
