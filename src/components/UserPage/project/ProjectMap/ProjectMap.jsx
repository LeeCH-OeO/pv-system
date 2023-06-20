import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { DialogOverlay, DialogContainer } from "./NewProductModal";
import {
  SelectForm,
  StyledSelect,
  InputForm,
  StyledInput,
  StyledLabel,
  StyledSearchButton,
  DetailContainer,
} from "./style";
import FetchGeo from "../CreateProject/CityNameToLocation";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../NavBar/UserNavBar";
const ProjectMap = ({ products, projectName }) => {
  const [productList, setProductList] = useState(products);
  const [addProductItem, setAddProductItem] = useState({ lat: "", lon: "" });

  const [addProductItemName, setAddProductItemName] = useState("");
  const [editProductItem, setEditProductItem] = useState({
    lat: "",
    lon: "",
    productName: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [searchText, setSearchtext] = useState("");
  const tempPorductTypeList = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
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
  const handleEditFormSearch = async (input) => {
    const result = await FetchGeo(input);
    try {
      console.log(result.data[0].lat, result.data[0].lon);
      setEditProductItem({
        ...editProductItem,
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

        productname: addProductItemName,
      },
    ]);

    setAddProductItem({ lat: "", lon: "" });

    setAddProductItemName("");
    setSearchtext("");
    setShowAddForm(false);
  };
  const handleEdit = ({ data }) => {
    setShowEditForm(true);
    setShowAddForm(false);
    console.log(data);
    setEditProductItem({
      lat: data.lat,
      lon: data.lon,

      productName: data.productName,
      index: data.index,
    });

    console.log(editProductItem);
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
      productName: editProductItem.productName,
    };
    setProductList(updatedList);
    setShowEditForm(false);
    setShowAddForm(false);
    setSearchtext("");
  };
  const handleClick = () => {
    const updatedProject = { projectName, products: productList };
    navigate("/user/projects/");
    console.log("updated project", updatedProject);
  };
  return (
    <>
      <UserNavBar />
      <DetailContainer>
        <h2>{projectName}</h2>
        <MapContainer
          ref={mapRef}
          style={{ width: "90vw", height: "80vh" }}
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
                    <p>{`lat: ${product.location.lat}, lon: ${product.location.lon}, product name:${product.productName}`}</p>{" "}
                    <button
                      onClick={() => {
                        handleOnDelete(index);
                      }}
                    >
                      delete
                    </button>
                    <button
                      onClick={() => {
                        handleEdit({
                          data: {
                            lat: product.location.lat,
                            lon: product.location.lon,
                            index: index,
                            area: product.area,
                            orientation: product.orientation,
                            tilt: product.tilt,
                            type: product.type,
                          },
                        });
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
        <button
          disabled={productList.length === 0}
          onClick={() => handleClick()}
        >
          save project
        </button>

        {showAddForm && (
          <DialogOverlay>
            <DialogContainer open onClose={() => setShowAddForm(false)}>
              <p>add new product</p>

              <InputForm>
                <StyledLabel htmlFor="latitude">Lat</StyledLabel>
                <StyledInput
                  type="number"
                  value={addProductItem.lat}
                  placeholder="Latitude"
                  id="latitude"
                  onChange={(e) => {
                    setAddProductItem({
                      ...addProductItem,
                      lat: e.target.value,
                    });
                  }}
                />
                <StyledLabel htmlFor="longitude">Lon</StyledLabel>
                <StyledInput
                  type="number"
                  value={addProductItem.lon}
                  placeholder="Longitude"
                  id="longitude"
                  onChange={(e) => {
                    setAddProductItem({
                      ...addProductItem,
                      lon: e.target.value,
                    });
                  }}
                />
                <StyledLabel htmlFor="search">search city </StyledLabel>

                <StyledInput
                  type="text"
                  id="search"
                  value={searchText}
                  onChange={(e) => setSearchtext(e.target.value)}
                />
                <StyledSearchButton
                  disabled={!searchText}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddFormSearch(searchText);
                  }}
                >
                  🔍
                </StyledSearchButton>
              </InputForm>

              <SelectForm>
                <StyledLabel>product name</StyledLabel>
                <StyledSelect
                  value={addProductItemName}
                  onChange={(e) => {
                    setAddProductItemName(e.target.value);
                  }}
                >
                  <option value={""}>--Select--</option>
                  {tempPorductTypeList.map((item, index) => {
                    return <option id={index}>{item}</option>;
                  })}
                </StyledSelect>
              </SelectForm>
              <button
                disabled={
                  !addProductItem.lat ||
                  !addProductItem.lon ||
                  !addProductItemName
                }
                onClick={() => addProduct()}
              >
                submit
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setAddProductItem({ lat: "", lon: "" });

                  setAddProductItemName("");
                  setSearchtext("");

                  setShowAddForm(false);
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

              <InputForm>
                <StyledLabel htmlFor="latitude">Lat</StyledLabel>
                <StyledInput
                  type="number"
                  value={editProductItem.lat}
                  placeholder="Latitude"
                  id="latitude"
                  onChange={(e) => {
                    setEditProductItem({
                      ...editProductItem,
                      lat: e.target.value,
                    });
                  }}
                />
                <StyledLabel htmlFor="longitude">Lon</StyledLabel>
                <StyledInput
                  type="number"
                  value={editProductItem.lon}
                  placeholder="Longitude"
                  id="longitude"
                  onChange={(e) => {
                    setEditProductItem({
                      ...editProductItem,
                      lon: e.target.value,
                    });
                  }}
                />
                <StyledLabel htmlFor="search">search city </StyledLabel>

                <StyledInput
                  type="text"
                  id="search"
                  value={searchText}
                  onChange={(e) => setSearchtext(e.target.value)}
                />
                <StyledSearchButton
                  disabled={!searchText}
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditFormSearch(searchText);
                  }}
                >
                  🔍
                </StyledSearchButton>
              </InputForm>

              <SelectForm>
                <StyledLabel>product name</StyledLabel>
                <StyledSelect
                  value={editProductItem.productName}
                  onChange={(e) => {
                    setEditProductItem({
                      ...editProductItem,
                      productName: e.target.value,
                    });
                  }}
                >
                  <option value={""}>--Select--</option>
                  {tempPorductTypeList.map((item, index) => {
                    return <option id={index}>{item}</option>;
                  })}
                </StyledSelect>
              </SelectForm>
              <button
                disabled={
                  !editProductItem.lat ||
                  !editProductItem.lon ||
                  !editProductItem.productName
                }
                onClick={() => addEditProductItem()}
              >
                submit
              </button>
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setSearchtext("");
                }}
              >
                cancel
              </button>
            </DialogContainer>
          </DialogOverlay>
        )}
      </DetailContainer>
    </>
  );
};

export default ProjectMap;
