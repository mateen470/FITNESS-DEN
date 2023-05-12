import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
const TrainerDashboardSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        minHeight: "100vh",
      }}
    >
      <Typography
        fontSize={"5vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        mb={4}
      >
        Trainer Dashboard
      </Typography>
      <Box
        sx={{
          minHeight: "60vh",
          minWidth: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
          zIndex: 10,
        }}
      >
        <Box>
          <NavLink to={"/all-workout-plan-req"}>
            <Typography
              color={"white"}
              fontSize={"5vh"}
              fontFamily={"Comme, sans-serif"}
              borderBottom={"0.5px solid white"}
            >
              All WorkoutPlans
            </Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink to={"/all-diet-plan-req"}>
            <Typography
              color={"white"}
              fontSize={"5vh"}
              fontFamily={"Comme, sans-serif"}
              borderBottom={"0.5px solid white"}
            >
              All DietPlans
            </Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink to={"/workout-plan-update-req"}>
            <Typography
              color={"white"}
              fontSize={"5vh"}
              fontFamily={"Comme, sans-serif"}
              borderBottom={"0.5px solid white"}
            >
              WorkoutPlan Update Requests
            </Typography>
          </NavLink>
        </Box>
        <Box>
          <NavLink to={"/diet-plan-update-req"}>
            <Typography
              color={"white"}
              fontSize={"5vh"}
              fontFamily={"Comme, sans-serif"}
              borderBottom={"0.5px solid white"}
            >
              DietPlan Update Requests
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
};

export default TrainerDashboardSection;
