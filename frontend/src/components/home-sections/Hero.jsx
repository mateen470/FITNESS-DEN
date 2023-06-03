import React from "react";
import { Box, Button, Container } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import NavBar from "./NavBar";

const Hero = ({ scrollToSection }) => {
  return (
    <Container
      sx={{
        position: "relative",
        backgroundImage:
          "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685800269/banner_uzwlda.png)",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
        minWidth: "100%",
        minHeight: `55vw`,
        mb: 0,
      }}
    >
      <NavBar />
      <Box
        sx={{
          textAlign: "center",
          position: "absolute",
          bottom: "35px",
          left: "45%",
        }}
      >
        <Button
          onClick={scrollToSection}
          sx={{
            color: "white",
            textTransform: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "1.5vw",
          }}
        >
          Explore More
          <KeyboardDoubleArrowDownIcon sx={{ fontSize: "2vw" }} />
        </Button>
      </Box>
    </Container>
  );
};

export default Hero;
