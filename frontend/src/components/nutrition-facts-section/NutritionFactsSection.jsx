import React from "react";
import { Typography, Box, Container } from "@mui/material";

const NutritionFactsSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        color={"white"}
        variant="h2"
        textAlign={"center"}
        sx={{ textShadow: "3px 0px 0px purple", fontWeight: 800 }}
      >
        Find Nutritional Facts
      </Typography>
    </Container>
  );
};

export default NutritionFactsSection;
