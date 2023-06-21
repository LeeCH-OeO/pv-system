import styled from "styled-components";
const SignUpForm = styled.div`
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
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
export { SignUpForm, FormContainer };
