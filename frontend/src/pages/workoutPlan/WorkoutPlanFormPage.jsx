import React from "react";
import WorkoutPlanForm from "../../components/workoutplan-section/WorkoutPlanForm";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const WorkoutPlanFormPage = () => {
  return (
    <>
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/workout-plans"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
          >
            <KeyboardDoubleArrowLeftIcon /> Back
          </Typography>
        </NavLink>
      </Box>
      <WorkoutPlanForm />
    </>
  );
};

export default WorkoutPlanFormPage;
