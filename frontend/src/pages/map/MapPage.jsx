import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MapSection from "../../components/map-section/MapSection";
import Footer from "../../components/home-sections/Footer";

const MapPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Container>
        <Box sx={{ position: "absolute", top: 0, left: 5 }}>
          <NavLink to={"/"}>
            <Typography
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize:
                  windowWidth < 1100 && windowHeight > 1000
                    ? "2vh"
                    : windowWidth < 1000
                    ? "1.2rem"
                    : "1.7vw",
              }}
            >
              <KeyboardDoubleArrowLeftIcon /> Home
            </Typography>
          </NavLink>
        </Box>
        <MapSection />
      </Container>
      <Box mt={4}>
        <Footer />
      </Box>
    </>
  );
};

export default MapPage;
