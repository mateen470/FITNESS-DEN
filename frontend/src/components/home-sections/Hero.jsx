import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Container } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import bannerImage from "../../assets/banner.svg";
import NavBar from "./NavBar";

const Hero = ({ scrollToSection }) => {
  return (
    <Container
      sx={{
        position: "relative",
        backgroundImage: `url(${bannerImage})`,
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
          ml: "6vw",
          transform: "rotate(90deg)",
          transformOrigin: "top left",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          color={"white"}
          display={"inline-block"}
          sx={{
            fontSize: "5vw",
            textShadow: "3px 0px 0px purple",
            fontWeight: 800,
          }}
        >
          own your
          <Typography
            sx={{
              background:
                " linear-gradient( rgba(92, 58, 180, 1) ,rgba(134, 69, 252, 1) ) ",
              backgroundClip: "text",
              webkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "none",
              fontWeight: 800,
              fontSize: "5vw",
            }}
            color={"white"}
            display={"inline-block"}
            ml={1}
          >
            FITNESS
          </Typography>
        </Typography>
      </Box>
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
          }}
        >
          Explore More
          <KeyboardDoubleArrowDownIcon />
        </Button>
      </Box>
    </Container>
  );
};

export default Hero;
