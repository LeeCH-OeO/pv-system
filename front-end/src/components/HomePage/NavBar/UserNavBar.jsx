import React from "react";
import {
  BrandTitle,
  NavBar,
  NavBarContainer,
  NavLink,
  NavLinks,
  ToggleButton,
  ToggleBar,
} from "./style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const UserNavBar = () => {
  const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(false);
  return (
    <div>
      <NavBarContainer />
      <NavBar>
        <BrandTitle onClick={() => navigate("/")}>PV System</BrandTitle>
        <ToggleButton
          onClick={() => {
            setIsExpand(!isExpand);
          }}
        >
          <ToggleBar></ToggleBar>
          <ToggleBar></ToggleBar>
          <ToggleBar></ToggleBar>
        </ToggleButton>
        <NavLinks isExpand={isExpand}>
          <NavLink
            onClick={() => {
              if (localStorage.getItem("userToken")) {
                navigate("/user/profile");
              }
              navigate("/user/signup");
            }}
          >
            user portal
            <span class="material-icons">person</span>
          </NavLink>
          <NavLink
            onClick={() => {
              console.log(localStorage.getItem("companyToken"));
              if (localStorage.getItem("companyToken")) {
                navigate("/company/profile");
              }
              navigate("/company/signup");
            }}
          >
            company portal<span class="material-icons">business</span>
          </NavLink>
        </NavLinks>
      </NavBar>
    </div>
  );
};

export default UserNavBar;
