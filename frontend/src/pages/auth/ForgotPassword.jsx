import React from "react";
import ForgotPasswordForm from "../../components/forgotPassword-section/ForgotPasswordForm";
import { Container } from "@mui/material";
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
      <ForgotPasswordForm />
    </Container>
  );
};

export default ForgotPassword;
