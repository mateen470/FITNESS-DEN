import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
const TrainerDashboardSection = () => {
  return (
    <Container>
      <Typography sx={{ textAlign: "center" }}>Trainer Dashboard</Typography>
      <Box
        sx={{
          display: "flex",
          felxDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box>
          <NavLink to={"/all-workout-plan-req"}>
            <Typography>All WorkoutPlans</Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink to={"/all-diet-plan-req"}>
            <Typography>All DietPlans</Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink to={"/workout-plan-update-req"}>
            <Typography>WorkoutPlan Update Requests</Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink to={"/diet-plan-update-req"}>
            <Typography>DietPlan Update Requests</Typography>
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
};

export default TrainerDashboardSection;
