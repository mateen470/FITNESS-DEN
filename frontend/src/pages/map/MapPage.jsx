import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
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
    <Footer />
    </>
  );
};

export default MapPage;
