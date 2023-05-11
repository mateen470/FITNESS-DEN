import React from "react";
import DietPlanSection from "../../components/dietplan-section/DietPlanSection";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Footer from "../../components/home-sections/Footer";

const DietPlanPage = () => {
  return (
    <>
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
      <DietPlanSection />
      <Box mt={4}>
        <Footer />
      </Box>
    </>
  );
};

export default DietPlanPage;
