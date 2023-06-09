import styled from "styled-components";
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.div`
  border: 1px solid gray;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 60vw;
`;
const ProductList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const ProductListText = styled.p`
  display: inline;
`;
export { Form, ProductList, ProductListText, FormContainer };
