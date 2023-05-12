import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MapSection from "../../components/map-section/MapSection";
import Footer from "../../components/home-sections/Footer";

const MapPage = () => {
  return (
    <>
    <Container>
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
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
