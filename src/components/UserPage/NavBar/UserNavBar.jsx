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
    <NavBarContainer>
      <NavBar>
        <BrandTitle>PV System</BrandTitle>
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
              navigate("/user/profile/");
            }}
          >
            Profile
          </NavLink>
          <NavLink
            onClick={() => {
              navigate("/user/projects/");
            }}
          >
            Projects
          </NavLink>
          <NavLink
            onClick={() => {
              navigate("/user/main/");
            }}
          >
            home
          </NavLink>
        </NavLinks>
      </NavBar>
    </NavBarContainer>
  );
};

export default UserNavBar;
