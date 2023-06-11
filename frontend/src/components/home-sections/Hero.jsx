import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import NavBar from "./NavBar";

const Hero = ({ scrollToSection }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
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
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth < 1100 && windowHeight > 1100 ? (
        <Container
          sx={{
            position: "relative",
            backgroundImage:
              "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1686423249/All_In_One-min_qmnhmv.svg)",
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
      ) : windowWidth < 1000 ? (
        <Container
          sx={{
            position: "relative",
            backgroundImage:
              "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1686423249/All_In_One-min_qmnhmv.svg)",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            minWidth: "100%",
            minHeight: `90vh`,
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
      ) : (
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
      )}
    </>
  );
};

export default Hero;
