import styled from "styled-components";
const ProductListPageContainer = styled.div`
  padding: 1rem;
`;
const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const IconButton = styled.button`
  display: inline-block;
  padding: 3px 6px;
  margin-left: 1px;
  margin-right: 1px;
  text-align: center;
  text-decoration: none;
  background-color: ${(props) => (props.disabled ? "gray" : "lightblue")};
  color: #fff;
  border: none;
  text-transform: uppercase;
  border-radius: 5px; /* Adjust the value to change the roundness */
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => !props.disabled && "CornflowerBlue"};
  }
`;
const DialogContainer = styled.dialog`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;
const ProductItemContainer = styled.div`
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const ProductItem = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;
const ProductItemButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const FabButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #f44336;
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
export {
  DialogOverlay,
  DialogContainer,
  ProductListContainer,
  ProductListPageContainer,
  ProductItem,
  ProductItemButtonContainer,
  ProductItemContainer,
  IconButton,
  ModalButtonContainer,
  FabButton,
  TitleContainer,
};
