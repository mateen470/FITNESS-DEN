import React from "react";
import NutritionFactsSection from "../../components/nutrition-facts-section/NutritionFactsSection";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Footer from "../../components/home-sections/Footer";

const NutritionFactsPage = () => {
  return (
    <>
      <Box>
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
        <NutritionFactsSection />
      </Box>
      <Footer />
    </>
  );
};

export default NutritionFactsPage;
