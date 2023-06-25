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
  ModalTitle,
  ModalButtonContainer,
  PopupContainer,
  PopupButtonContainer,
  IconButton,
  TextButton,
} from "./style";
import axios from "axios";
import FetchGeo from "../CreateProject/CityNameToLocation";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../NavBar/UserNavBar";
const ProjectMap = ({ products, projectID, projectName }) => {
  const [productList, setProductList] = useState(products);
  const [addProductItem, setAddProductItem] = useState({ lat: "", lon: "" });

  const [companyProductID, setCompanyProductID] = useState("");
  const [editProductItem, setEditProductItem] = useState({
    lat: "",
    lon: "",
    companyProductID: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [searchText, setSearchtext] = useState("");
  const [deleteList, setDeleteList] = useState([]);
  const [companyProductList, setCompanyProductList] = useState([]);
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
    console.log(productList[index]);
    if (productList[index]._id) {
      console.log("old");
      setDeleteList([...deleteList, productList[index]]);
    }
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

      setCompanyProductID("");
      setSearchtext("");
      setShowAddForm(false);
      alert("Free user can have only 3 product");
    } else {
      setProductList([
        ...productList,
        {
          lat: addProductItem.lat,
          lon: addProductItem.lon,

          companyProductID: companyProductID,
        },
      ]);

      setAddProductItem({ lat: "", lon: "" });

      setCompanyProductID("");
      setSearchtext("");
      setShowAddForm(false);
    }
  };
  const handleEdit = (data) => {
    setShowEditForm(true);
    setShowAddForm(false);
    console.log("editData", data);
    setEditProductItem({
      ...data,
      lat: data.lat,
      lon: data.lon,

      companyProductID: data.companyProductID,
    });

    closePopup();
  };
  const addEditProductItem = () => {
    console.log(editProductItem);
    const updatedList = [...productList];
    updatedList[editProductItem.index] = {
      ...editProductItem,

      lat: editProductItem.lat,
      lon: editProductItem.lon,

      companyProductID: editProductItem.companyProductID,
    };
    setProductList(updatedList);
    setShowEditForm(false);
    setShowAddForm(false);
    setSearchtext("");
  };
  const handleClick = () => {
    console.log("updated project", productList);
    const newList = productList.filter((item) => !item._id);
    const oldList = productList.filter((item) => item._id);
    console.log("new", newList);
    console.log("old", oldList);
    console.log(projectID);
    if (newList.length !== 0) {
      console.log("have new");
      newList.map((item) => {
        axios({
          method: "post",
          url: "http://127.0.0.1:1212/api/userproduct/create",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          data: {
            lat: Number(item.lat),
            lon: Number(item.lon),
            projectID: projectID,
            companyProductID: item.companyProductID,
          },
        });
      });
    }
    if (oldList.length !== 0) {
      console.log("have old");
      oldList.map((item) => {
        axios({
          method: "patch",
          url: "http://127.0.0.1:1212/api/userproduct/update",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          data: {
            data: {
              lat: item.lat,
              lon: item.lon,
              companyProductID: item.companyProductID,
              createBy: item.createBy,
            },
            id: item._id,
          },
        });
      });
    }

    if (deleteList.length !== 0) {
      console.log("have delete");
      deleteList.map((item) => {
        axios({
          method: "delete",
          url: "http://127.0.0.1:1212/api/userproduct/delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          data: { id: item._id },
        });
      });
    }
    navigate("/user/projects/");
  };
  return (
    <>
      <UserNavBar />
      <DetailContainer>
        <h2>{projectName}</h2>
        <MapContainer
          ref={mapRef}
          style={{ width: "90vw", height: "90vh" }}
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
              <Marker position={[product.lat, product.lon]} key={index}>
                <Popup>
                  <PopupContainer>
                    <h4>
                      Product name: {product.companyProductID} <br /> Latitude:{" "}
                      {product.lat}
                      <br /> Longitude: {product.lon}
                    </h4>
                  </PopupContainer>
                  <PopupButtonContainer>
                    <IconButton
                      title="Delete"
                      disabled={productList.length <= 1}
                      onClick={() => {
                        handleOnDelete(index);
                      }}
                    >
                      <span class="material-icons">delete</span>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleEdit({
                          ...product,
                          index: index,
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
          save project
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
                <IconButton
                  disabled={!searchText}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddFormSearch(searchText);
                  }}
                >
                  <span class="material-icons">travel_explore</span>{" "}
                </IconButton>
              </InputForm>

              <SelectForm>
                <StyledLabel>product name</StyledLabel>
                <StyledSelect
                  value={companyProductID}
                  onChange={(e) => {
                    setCompanyProductID(e.target.value);
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
                    setShowAddForm(false);
                    setAddProductItem({ lat: "", lon: "" });

                    setCompanyProductID("");
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
                    !companyProductID
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
                <h2>Edit product</h2>
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

              {/* <SelectForm>
                <StyledLabel>product name</StyledLabel>
                <StyledSelect
                  value={editProductItem.companyProductID}
                  onChange={(e) => {
                    setEditProductItem({
                      ...editProductItem,
                      companyProductID: e.target.value,
                    });
                  }}
                >
                  <option value={""}>--Select--</option>
                  {companyProductList.map((item, index) => {
                    return <option id={index}>{item.productName}</option>;
                  })}
                </StyledSelect>
              </SelectForm> */}
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
                    !editProductItem.companyProductID
                  }
                  onClick={() => addEditProductItem()}
                >
                  <span class="material-icons">save</span>{" "}
                </IconButton>
              </ModalButtonContainer>
            </DialogContainer>
          </DialogOverlay>
        )}
      </DetailContainer>
    </>
  );
};

export default ProjectMap;
