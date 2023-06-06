import React from "react";
import { Typography, Box } from "@mui/material";
import NutritionFacts from "./NutritionFacts";
const NutritionFactsSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage:
          "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1686055643/Untitled_design_16_-min_ody48r.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minWidth: "100vw",
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
      <NutritionFacts />
    </Box>
  );
};

export default NutritionFactsSection;
