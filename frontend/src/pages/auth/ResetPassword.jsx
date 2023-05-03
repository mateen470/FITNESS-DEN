import React from "react";
import ResetPasswordForm from "../../components/resetPassword-section/ResetPasswordForm";
import { Container } from "@mui/material";

const ResetPassword = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ResetPasswordForm />
    </Container>
  );
};

export default ResetPassword;
