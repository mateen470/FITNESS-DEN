import React, { useEffect, useState } from "react";
import ForgotPasswordForm from "../../components/forgotPassword-section/ForgotPasswordForm";
import { Box, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const ForgotPassword = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/login"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: windowWidth < 1100 ? "1.4rem" : "1.7vw",
            }}
          >
            <KeyboardDoubleArrowLeftIcon /> Back
          </Typography>
        </NavLink>
      </Box>
      <ForgotPasswordForm />
    </Container>
  );
};

export default ForgotPassword;
