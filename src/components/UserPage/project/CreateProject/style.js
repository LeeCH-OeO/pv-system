import styled, { css } from "styled-components";
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
const Form = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-color: green;
  width: 30%;
  @media (max-width: 800px) {
    width: 80%;
  }
  padding: 1rem;
  margin-bottom: 1rem;
`;
const LocationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  text-align: center;
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
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
`;
const Button = styled.button`
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  background-color: #3498db;
  color: #fff;
  border: none;
  text-transform: uppercase;
  border-radius: 10px; /* Adjust the value to change the roundness */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
    `}
`;
export {
  Form,
  ProductList,
  ProductListText,
  FormContainer,
  SearchContainer,
  Button,
  LocationContainer,
};
