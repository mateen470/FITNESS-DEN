import React from "react";
import ForgotPasswordForm from "../../components/forgotPassword-section/ForgotPasswordForm";
import { Box, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
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
      <ForgotPasswordForm />
    </Container>
  );
};

export default ForgotPassword;
