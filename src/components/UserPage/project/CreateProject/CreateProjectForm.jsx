import React from "react";
import {
  Form,
  ProductList,
  ProductListText,
  FormContainer,
  SearchContainer,
  Button,
  LocationContainer,
} from "./style";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FetchGeo from "./CityNameToLocation";
import CancelIcon from "@mui/icons-material/Cancel";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
const CreateProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [searchText, setSearchtext] = useState("");
  const [productList, setProductList] = useState([]);
  const [productSelectValue, setProductSelectValue] = useState({
    productType: "",
    lat: "",
    lon: "",
  });
  const handleOnClick = () => {
    setProductList((productList) => [...productList, productSelectValue]);
    setProductSelectValue({
      productType: "",
      lat: "",
      lon: "",
    });
  };
  const handleOnDelete = (index) => {
    const updatedList = [...productList];
    updatedList.splice(index, 1);
    setProductList(updatedList);
  };
  const handleSearch = async (input) => {
    const result = await FetchGeo(input);
    try {
      console.log(result.data[0].lat, result.data[0].lon);
      setProductSelectValue({
        ...productSelectValue,
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
  return (
    <FormContainer>
      <Form>
        <h2>New Project</h2>
        <div>
          <TextField
            label="Project Name"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          ></TextField>
        </div>

        <FormControl sx={{ m: 1, minWidth: 120 }} variant="filled">
          <InputLabel id="product-list">products</InputLabel>
          <Select
            labelId="product-list"
            onChange={(e) => {
              setProductSelectValue({
                ...productSelectValue,
                productType: e.target.value,
              });
            }}
            defaultValue=""
          >
            <MenuItem value="product 1">Product 1</MenuItem>
            <MenuItem value="product 2">Product 2</MenuItem>
            <MenuItem value="product 3">Product 3</MenuItem>
          </Select>
          <LocationContainer>
            <TextField
              label="Latitude"
              required
              margin="dense"
              type="number"
              value={productSelectValue.lat}
              onChange={(e) =>
                setProductSelectValue({
                  ...productSelectValue,
                  lat: e.target.value,
                })
              }
            />
            <TextField
              label="Longitude"
              margin="dense"
              required
              type="number"
              value={productSelectValue.lon}
              onChange={(e) =>
                setProductSelectValue({
                  ...productSelectValue,
                  lon: e.target.value,
                })
              }
            />
          </LocationContainer>
          <SearchContainer>
            <TextField
              value={searchText}
              label="search city"
              onChange={(e) => {
                setSearchtext(e.target.value);
              }}
            />

            <IconButton
              disabled={!searchText}
              color="primary"
              onClick={() => handleSearch(searchText)}
            >
              <TravelExploreIcon />
            </IconButton>
          </SearchContainer>
          <Button
            disabled={
              productSelectValue.productType &&
              productSelectValue.lat &&
              productSelectValue.lon
                ? false
                : true
            }
            onClick={handleOnClick}
          >
            add
          </Button>
        </FormControl>
        <ProductList>
          {productList.length !== 0 ? (
            productList.map((product, index) => {
              return (
                <div key={index}>
                  <ProductListText>
                    {product.productType}, lat: {product.lat}, lon:{product.lon}
                  </ProductListText>
                  <IconButton
                    color="primary"
                    onClick={() => handleOnDelete(index)}
                  >
                    <CancelIcon />
                  </IconButton>
                </div>
              );
            })
          ) : (
            <p>no product</p>
          )}
        </ProductList>
        <div></div>
      </Form>
      <Button
        disabled={productList.length === 0 || !projectName}
        onClick={() => {
          console.log("project name: ", projectName, productList);
        }}
      >
        submit
      </Button>
    </FormContainer>
  );
};

export default CreateProjectForm;
