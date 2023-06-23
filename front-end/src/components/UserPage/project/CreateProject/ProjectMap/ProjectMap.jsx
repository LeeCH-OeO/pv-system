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
  DetailContainer,
  SelectForm,
  StyledSelect,
  InputForm,
  StyledInput,
  StyledLabel,
  StyledSearchButton,
  PopupContainer,
  PopupButtonContainer,
  IconButton,
  ModalTitle,
  ModalButtonContainer,
  TextButton,
} from "./style";
import axios from "axios";
import FetchGeo from "../CityNameToLocation";
import { useNavigate } from "react-router-dom";
const ProjectMap = () => {
  const [productList, setProductList] = useState([]);
  const [addProductItem, setAddProductItem] = useState({ lat: "", lon: "" });
  const [companyProductList, setCompanyProductList] = useState([]);
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
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://127.0.0.1:1212/api/companyproduct/user-list",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        if (response) {
          setCompanyProductList(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log("err:", error);
        setIsEmpty(true);
      }
    };
    fetchData();
  }, []);
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
    if (
      localStorage.getItem("isUnlimited") === "false" &&
      productList.length === 3
    ) {
      setAddProductItem({ lat: "", lon: "" });
      setAddProductItemName("");
      setSearchtext("");
      setShowAddForm(false);
      alert("Free user can have only 3 product");
    } else {
      setProductList([
        ...productList,
        {
          location: {
            lat: addProductItem.lat.toString(),
            lon: addProductItem.lon.toString(),
          },

          productName: addProductItemName,
        },
      ]);

      setAddProductItem({ lat: "", lon: "" });
      setAddProductItemName("");
      setSearchtext("");
      setShowAddForm(false);
    }
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
  const handleClick = async () => {
    productList.map((item) => {
      axios({
        method: "post",
        url: "http://127.0.0.1:1212/api/userproduct/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: {
          lat: Number(item.location.lat),
          lon: Number(item.location.lon),
          projectID: localStorage.getItem("newProjectID"),
          companyProductID: item.productName,
        },
      });
    });
    navigate("/user/projects/");
  };
  return (
    <DetailContainer>
      <h2>2. set your product</h2>
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
                <PopupContainer>
                  <h3>
                    Product Name: {product.productName} <br />
                    Latitude: {product.location.lat} <br />
                    longitude: {product.location.lon}{" "}
                  </h3>
                </PopupContainer>
                <PopupButtonContainer>
                  <IconButton
                    onClick={() => {
                      handleOnDelete(index);
                    }}
                  >
                    <span class="material-icons">delete</span>
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      handleEdit({
                        data: {
                          lat: product.location.lat,
                          lon: product.location.lon,
                          index: index,

                          productName: product.productName,
                        },
                      });
                    }}
                  >
                    <span class="material-icons">edit</span>
                  </IconButton>
                </PopupButtonContainer>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <TextButton
        disabled={productList.length === 0}
        onClick={() => handleClick()}
      >
        creat project
      </TextButton>

      {showAddForm && (
        <DialogOverlay>
          <DialogContainer open onClose={() => setShowAddForm(false)}>
            <ModalTitle>
              <h2>Add New Product</h2>
            </ModalTitle>

            <InputForm>
              <StyledLabel htmlFor="latitude">Lat</StyledLabel>
              <StyledInput
                type="number"
                value={addProductItem.lat}
                placeholder="Latitude"
                id="latitude"
                onChange={(e) => {
                  setAddProductItem({ ...addProductItem, lat: e.target.value });
                }}
              />
              <StyledLabel htmlFor="longitude">Lon</StyledLabel>
              <StyledInput
                type="number"
                value={addProductItem.lon}
                placeholder="Longitude"
                id="longitude"
                onChange={(e) => {
                  setAddProductItem({ ...addProductItem, lon: e.target.value });
                }}
              />
              <StyledLabel htmlFor="search">search city </StyledLabel>

              <StyledInput
                type="text"
                id="search"
                value={searchText}
                onChange={(e) => setSearchtext(e.target.value)}
              />
              <IconButton
                disabled={!searchText}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddFormSearch(searchText);
                }}
              >
                <span class="material-icons">travel_explore</span>
              </IconButton>
            </InputForm>

            <SelectForm>
              <StyledLabel>product Name</StyledLabel>
              <StyledSelect
                value={addProductItemName}
                onChange={(e) => {
                  setAddProductItemName(e.target.value);
                }}
              >
                <option value={""}>--Select--</option>
                {companyProductList.map((item, index) => {
                  return <option id={index}>{item.productName}</option>;
                })}
              </StyledSelect>
            </SelectForm>
            <ModalButtonContainer>
              <IconButton
                title="cancel"
                onClick={() => {
                  setShowAddForm(false);
                  setAddProductItem({ lat: "", lon: "" });
                  setAddProductItemName("");
                  setSearchtext("");

                  setShowAddForm(false);
                }}
              >
                <span class="material-icons">cancel</span>
              </IconButton>
              <IconButton
                disabled={
                  !addProductItem.lat ||
                  !addProductItem.lon ||
                  !addProductItemName
                }
                onClick={() => addProduct()}
              >
                <span class="material-icons">add_circle</span>
              </IconButton>
            </ModalButtonContainer>
          </DialogContainer>
        </DialogOverlay>
      )}
      {showEditForm && (
        <DialogOverlay>
          <DialogContainer open onClose={() => setShowEditForm(false)}>
            <ModalTitle>
              <h2>edit product</h2>
            </ModalTitle>

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
              <IconButton
                disabled={!searchText}
                onClick={(e) => {
                  e.preventDefault();
                  handleEditFormSearch(searchText);
                }}
              >
                <span class="material-icons">travel_explore</span>
              </IconButton>
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
                {companyProductList.map((item, index) => {
                  return <option id={index}>{item.productName}</option>;
                })}
              </StyledSelect>
            </SelectForm>
            <ModalButtonContainer>
              <IconButton
                onClick={() => {
                  setShowEditForm(false);
                  setSearchtext("");
                }}
              >
                <span class="material-icons">cancel</span>
              </IconButton>
              <IconButton
                disabled={
                  !editProductItem.lat ||
                  !editProductItem.lon ||
                  !editProductItem.productName
                }
                onClick={() => addEditProductItem()}
              >
                <span class="material-icons">save</span>
              </IconButton>
            </ModalButtonContainer>
          </DialogContainer>
        </DialogOverlay>
      )}
    </DetailContainer>
  );
};

export default ProjectMap;
