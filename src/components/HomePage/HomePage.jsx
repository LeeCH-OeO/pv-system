import React from "react";
import {
  ArticleImgContainer,
  ParagraphContainer,
  ButtonContainer,
} from "./style";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ParagraphContainer>
        <h3
          style={{
            fontFamily: "Noto serif",
            fontSize: "x-large",
            fontWeight: "700",
          }}
        >
          Experience the future of clean energy with our solar power system
          webpage! Harnessing the sun's energy, our system offers eco-friendly
          electricity solutions. Say goodbye to high bills and hello to savings
          and independence. Our customizable solutions cater to homeowners,
          businesses, and communities. Enjoy seamless installation, maintenance,
          and support from our expert team. Join the clean energy revolution
          today!
        </h3>
        <ArticleImgContainer>
          <img
            src="https://2.bp.blogspot.com/-YKil1-Ct5k4/VrN1Gs5S_PI/AAAAAAAA3xI/qmS23ghLyBE/s800/denkyuu_eco.png"
            style={{ objectFit: "cover" }}
            width="80%"
            height="100%"
          />
        </ArticleImgContainer>
      </ParagraphContainer>
      <ButtonContainer>
        <Button variant="contained" onClick={() => navigate("user/main")}>
          user
        </Button>
        <Button variant="contained">company</Button>
      </ButtonContainer>
    </div>
  );
};

export default HomePage;
