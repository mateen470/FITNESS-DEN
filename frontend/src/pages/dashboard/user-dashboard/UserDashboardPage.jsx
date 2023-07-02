import React, { useEffect, useState } from "react";
import UserDashboardSection from "../../../components/user-dashboard-section/UserDashboardSection";
import { Box, Container, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { NavLink } from "react-router-dom";

const UserDashboardPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
        <Box sx={{ position: "absolute", top: 0, left: 5 }}>
          <NavLink to={"/"}>
            <Typography
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize:
                  windowWidth < 1100 &&
                  windowWidth > 1000 &&
                  windowHeight > 1000
                    ? "2vh"
                    : windowWidth < 1000
                    ? "1.2rem"
                    : "1.7vw",
              }}
            >
              <KeyboardDoubleArrowLeftIcon /> Home
            </Typography>
          </NavLink>
        </Box>
        <UserDashboardSection />
      </Container>
    </Box>
  );
};

export default UserDashboardPage;
