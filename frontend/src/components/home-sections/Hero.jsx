import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import NavBar from "./NavBar";
import MobileViewHeroSection from "./MobileViewHeroSection";

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
        <Box
          sx={{
            position: "relative",
            backgroundImage:
              "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685800269/banner_uzwlda.png)",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            minWidth: "100%",
            minHeight: `70vw`,
            mb: 0,
            pr: 1,
          }}
        >
          <NavBar />
          <Box
            sx={{
              textAlign: "center",
              position: "absolute",
              bottom: "0px",
              left: "40%",
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
                fontSize: "2vw",
              }}
            >
              Explore More
              <KeyboardDoubleArrowDownIcon sx={{ fontSize: "2vw" }} />
            </Button>
          </Box>
        </Box>
      ) : windowWidth < 1000 ? (
        <Box
          sx={{
            pt: 5,
            position: "relative",
            backgroundImage:
              "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779141/user-smoke_artunt.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <NavBar />
          <MobileViewHeroSection />
        </Box>
      ) : (
        <Box
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
            pr: 1.25,
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
        </Box>
      )}
    </>
  );
};

export default Hero;
{
  /* <Box
          sx={{
            position: "relative",
            backgroundImage:
              "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1688130266/HeroSectionMT_p7atp4.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "170% 100%",
            minHeight: `90vh`,
            mb: 0,
          }}
        >
          <NavBar />
          <Box
            sx={{
              textAlign: "center",
              position: "absolute",
              bottom: "0px",
              left:
                windowWidth < 600 && windowWidth > 400
                  ? "35vw"
                  : windowWidth < 400
                  ? "30vw"
                  : "40vw",
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
                fontSize: "1rem",
              }}
            >
              Explore More
              <KeyboardDoubleArrowDownIcon sx={{ fontSize: "1rem" }} />
            </Button>
          </Box>
        </Box> */
}
