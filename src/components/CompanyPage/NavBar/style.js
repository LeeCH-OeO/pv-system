import styled, { createGlobalStyle } from "styled-components";
const NavBarContainer = createGlobalStyle`
body{
  margin: 0;
  padding: 0;}
  
`;
const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: green;
  color: white;
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const BrandTitle = styled.div`
  font-size: 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
`;
const NavLinks = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  @media (max-width: 400px) {
    display: ${(props) => (props.isExpand ? "flex" : "none")};
    width: 100%;
    flex-direction: column;
  }
`;
const NavLink = styled.li`
  list-style: none;
  color: white;
  padding: 1rem;
  display: block;
  cursor: pointer;
  @media (max-width: 400px) {
    text-align: center;
    padding: 0.5rem 1rem;
  }
  &:hover {
    background-color: #999;
  }
`;
const ToggleButton = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;

  @media (max-width: 400px) {
    display: flex;
  }
`;
const ToggleBar = styled.span`
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
`;
export {
  NavBarContainer,
  NavBar,
  BrandTitle,
  NavLinks,
  NavLink,
  ToggleButton,
  ToggleBar,
};
