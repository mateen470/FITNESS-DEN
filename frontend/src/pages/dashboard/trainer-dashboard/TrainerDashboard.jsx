import React from "react";
import TrainerDashboardSection from "../../../components/trainer-dashboard-section/TrainerDashboardSection";
import userSmoke from "../../../assets/user-smoke.svg";
import { Box, Container } from "@mui/material";

const TrainerDashboard = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${userSmoke})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <TrainerDashboardSection />
      </Container>
    </Box>
  );
};

export default TrainerDashboard;
