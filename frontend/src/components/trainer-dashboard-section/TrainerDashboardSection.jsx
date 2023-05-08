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
        <NavLink>WorkoutPlan Requests</NavLink>
        <NavLink>WorkoutPlan Update Requests</NavLink>
        <NavLink>DietPlan Requests</NavLink>
        <NavLink>DietPlan Update Requests</NavLink>
        <NavLink>All WorkoutPlans</NavLink>
        <NavLink>All DietPlans</NavLink>
      </Box>
    </Container>
  );
};

export default TrainerDashboardSection;
