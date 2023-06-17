import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
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
        <Box
          sx={{
            position: "relative",
            backgroundImage:
              "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1686825564/S_o_l_u_t_i_o_n-min_d87otp.svg)",
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
        </Box>
      ) : windowWidth < 1000 ? (
        <Box
          sx={{
            position: "relative",
            backgroundImage:
              "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1686825564/S_o_l_u_t_i_o_n-min_d87otp.svg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
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
