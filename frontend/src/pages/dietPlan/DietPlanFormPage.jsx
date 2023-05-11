import React from "react";
import DietPlanForm from "../../components/dietplan-section/DietPlanForm";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const DietPlanFormPage = () => {
  return (
    <>
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/diet-plans"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
          >
            <KeyboardDoubleArrowLeftIcon /> Back
          </Typography>
        </NavLink>
      </Box>
      <DietPlanForm />
    </>
  );
};

export default DietPlanFormPage;
