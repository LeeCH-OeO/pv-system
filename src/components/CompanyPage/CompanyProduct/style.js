import styled from "styled-components";
const ProductListPageContainer = styled.div`
  padding: 1rem;
`;
const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
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
export {
  DialogOverlay,
  DialogContainer,
  ProductListContainer,
  ProductListPageContainer,
};
