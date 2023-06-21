import styled from "styled-components";
const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 90vh;
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
const RoundButton = styled.button`
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

const SelectForm = styled.form`
  /* Add your custom styles here */
  /* Example styles */
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const StyledSelect = styled.select`
  /* Add your custom styles for the select element here */
  /* Example styles */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;
const InputForm = styled.form`
  /* Add your custom styles here */
  /* Example styles */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledInput = styled.input`
  /* Add your custom styles for the input element here */
  /* Example styles */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 5rem;
`;
const StyledLabel = styled.label`
  /* Add your custom styles for the label element here */
  /* Example styles */
  font-weight: bold;
`;
const StyledSearchButton = styled.button`
  /* Add your custom styles for the button element here */
  /* Example styles */

  padding: 6px 10px;
  border-radius: 4px;
  border: none;
`;
const StyledSearchInputContainer = styled.div`
  /* Add your custom styles for the input container here */
  /* Example styles */
  position: relative;
`;
const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PopupButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
const TextButton = styled.button`
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 1rem;
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
      pointer-events: not-allowed;
    `}
`;
export {
  DetailContainer,
  RoundButton,
  SelectForm,
  StyledSelect,
  InputForm,
  StyledInput,
  StyledLabel,
  StyledSearchButton,
  StyledSearchInputContainer,
  ModalTitle,
  ModalButtonContainer,
  PopupContainer,
  PopupButtonContainer,
  TextButton,
  IconButton,
};
