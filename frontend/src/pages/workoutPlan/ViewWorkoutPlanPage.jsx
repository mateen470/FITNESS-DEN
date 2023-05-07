import React from "react";
import ViewWorkoutPlan from "../../components/workoutplan-section/ViewWorkoutPlan";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const ViewWorkoutPlanPage = () => {
  return (
    <>
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/user"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
          >
            <KeyboardDoubleArrowLeftIcon /> User Dashboard
          </Typography>
        </NavLink>
      </Box>
      <ViewWorkoutPlan />
    </>
  );
};

export default ViewWorkoutPlanPage;
