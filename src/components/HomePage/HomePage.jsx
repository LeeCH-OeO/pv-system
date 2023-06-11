import React from "react";
import {
  ArticleContent,
  ParagraphContainer,
  Image,
  ImageContainer,
  TitleContainer,
  TitleOuterContainer,
} from "./style";
import UserNavBar from "./NavBar/UserNavBar";

const HomePage = () => {
  return (
    <>
      <UserNavBar />
      <TitleOuterContainer>
        <TitleContainer>
          <ArticleContent>
            <h1>
              Discover the boundless potential of solar energy and dance towards
              a radiant future!
            </h1>
            <h3>
              Welcome to our Solar System website! We are your energy choice
              experts. We provide you with a one-stop solution for solar energy,
              where you can freely choose the installation location and solar
              panel models. Moreover, we collaborate with various solar energy
              companies, each offering their own range of products, ensuring
              that you have access to the highest quality options that meet your
              specific needs.
            </h3>
          </ArticleContent>
          <ImageContainer>
            <Image src="https://2.bp.blogspot.com/-YKil1-Ct5k4/VrN1Gs5S_PI/AAAAAAAA3xI/qmS23ghLyBE/s800/denkyuu_eco.png"></Image>
          </ImageContainer>
        </TitleContainer>
      </TitleOuterContainer>
      <div style={{ height: "50vh" }}>
        <ParagraphContainer imageRight>
          <ArticleContent>
            <h4>
              Empowering User Choice: On our platform, you have the freedom to
              select the ideal installation location and solar panel models.
              Whether it's for residential, commercial, or agricultural
              purposes, we offer tailor-made solutions. You can browse through
              the products offered by different solar energy companies and
              choose the most suitable solar panels that maximize system
              performance and efficiency.
            </h4>
          </ArticleContent>
          <ImageContainer>
            <Image src="https://3.bp.blogspot.com/-RjcDnFImHo4/WRaTKDVrNQI/AAAAAAABEOw/zNHaFrfr2YcHkf7Kv5BvsoeKHMTGQGfuQCLcB/s800/house_jikahatsuden_zeh.png" />
          </ImageContainer>
        </ParagraphContainer>
      </div>
      <ParagraphContainer>
        <ArticleContent>
          <h4>
            Connecting Businesses and Customers: Our website allows both
            customers and solar energy companies to register accounts. As a
            customer, you can create a personal account to explore detailed
            information about various solar systems and products, communicate
            with companies in real-time, track order statuses, and stay updated
            with the latest industry news. As a solar energy company, you can
            register a business account to showcase your products and services,
            engage directly with customers, provide solutions, and explore
            business opportunities.
          </h4>
        </ArticleContent>
        <ImageContainer>
          <Image src="https://2.bp.blogspot.com/-gXDzx2DKTfU/UYtwt-MWUbI/AAAAAAAARv8/e_XMW_x8pUE/s800/job_denkikouji.png" />
        </ImageContainer>
      </ParagraphContainer>
      <ParagraphContainer>
        <ArticleContent>
          <h4>
            Join our Solar System website today and embark on a new chapter of
            the energy revolution! We offer:
            <ul>
              <li>
                Freedom to choose installation locations and solar panel models
                that perfectly align with your requirements.
              </li>
              <li>
                Collaboration with multiple solar energy companies, ensuring
                access to the finest solution.
              </li>
              <li>
                Registration for both customers and solar energy companies,
                facilitating convenient interactions and business growth.
              </li>
            </ul>
            Take the leap and join us as we pursue the endless possibilities of
            solar energy. Together, let's shape a brighter and sustainable
            future!
          </h4>
        </ArticleContent>
        <ImageContainer>
          <Image src="https://1.bp.blogspot.com/-hEH4NwnHbIw/U400-nkcbbI/AAAAAAAAg7c/lnPJPI4cOz0/s800/earth_good.png" />
        </ImageContainer>
      </ParagraphContainer>
    </>
  );
};

export default HomePage;
