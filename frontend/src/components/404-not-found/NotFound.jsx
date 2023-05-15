import React from "react";
import { Container, Typography } from "@mui/material";
const NotFound = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h2">404 Not Found</Typography>
    </Container>
  );
};

export default NotFound;
