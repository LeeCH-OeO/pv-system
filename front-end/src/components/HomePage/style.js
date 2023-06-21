import styled from "styled-components";

const ParagraphContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.imageRight ? "row" : "row-reverse")};

  @media (max-width: 800px) {
    flex-direction: column;
  }
  padding-left: 1rem;
  padding-right: 1rem;
`;
const ArticleContent = styled.div`
  flex: 1;

  /* Add any other desired styles for the article content */
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
`;
const ImageContainer = styled.div`
  width: 30%;
  @media (max-width: 800px) {
    width: 50%;
  }
`;
const Image = styled.img`
  width: 100%;
`;
const TitleOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export {
  TitleContainer,
  ImageContainer,
  Image,
  ParagraphContainer,
  ArticleContent,
  TitleOuterContainer,
};
