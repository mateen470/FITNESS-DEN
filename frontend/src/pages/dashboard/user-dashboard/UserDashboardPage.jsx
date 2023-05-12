import React from "react";
import UserDashboardSection from "../../../components/user-dashboard-section/UserDashboardSection";
import { Box, Container, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { NavLink } from "react-router-dom";

const UserDashboardPage = () => {
  return (
    <Container>
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
      <UserDashboardSection />
    </Container>
  );
};

export default UserDashboardPage;
