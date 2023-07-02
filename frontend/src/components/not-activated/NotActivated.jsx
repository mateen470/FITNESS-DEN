import React from "react";
import { Container, Typography } from "@mui/material";

const NotActivated = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h2">Account Verification Failed!</Typography>
    </Container>
  );
};

export default NotActivated;
