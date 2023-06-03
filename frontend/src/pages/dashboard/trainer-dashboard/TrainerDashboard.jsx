import React from "react";
import TrainerDashboardSection from "../../../components/trainer-dashboard-section/TrainerDashboardSection";
import { Box, Container } from "@mui/material";

const TrainerDashboard = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779141/user-smoke_artunt.svg)",
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
