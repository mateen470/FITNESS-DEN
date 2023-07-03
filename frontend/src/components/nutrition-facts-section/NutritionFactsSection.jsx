import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import NutritionFacts from "./NutritionFacts";
const NutritionFactsSection = () => {
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
        variant={
          windowWidth < 900 && windowWidth > 500
            ? "h3"
            : windowWidth < 500
            ? "h4"
            : "h2"
        }
        textAlign={"center"}
        sx={{
          textShadow: "3px 0px 0px purple",
          fontWeight: 800,
          mt: windowWidth < 600 ? 10 : "",
        }}
      >
        Find Nutritional Facts
      </Typography>
      <NutritionFacts />
    </Box>
  );
};

export default NutritionFactsSection;
