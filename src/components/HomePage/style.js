import styled from "styled-components";
const ArticleImgContainer = styled.div`
  width: 30vw;
  height: 30vh;
`;
const ParagraphContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
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
`;
export { ArticleImgContainer, ParagraphContainer, ButtonContainer, Button };
