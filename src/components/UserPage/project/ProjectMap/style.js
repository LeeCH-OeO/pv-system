import styled from "styled-components";
const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const SideContainer = styled.div`
  max-width: 20vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const ProductListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #00bcd4;
  color: #ffffff;
  border: none;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;
  z-index: 9999;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0097a7")};
  }
`;
export { DetailContainer, FloatingActionButton };
