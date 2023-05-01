import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import bannerImage from "../../assets/banner.svg";
import NavBar from "./NavBar";

const Hero = ({ scrollToSection }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
      {isLoaded && (
        <>
          <NavBar />
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ y: 10, x: width > 1400 ? "7rem" : "5rem", opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.6 }}
            style={{ minHeight: "100%" }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
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
                sx={{ fontSize: "5vw", textShadow: "3px 0px 0px purple" }}
              >
                own your
                <Typography
                  style={{
                    background:
                      " linear-gradient( rgba(92, 58, 180, 1) ,rgba(134, 69, 252, 1) ) ",
                    backgroundClip: "text",
                    webkitBackgroundClip: "text",
                    color: "transparent",
                    textShadow: "none",
                  }}
                  color={"white"}
                  display={"inline-block"}
                  ml={1}
                  sx={{ fontSize: "5vw" }}
                >
                  FITNESS
                </Typography>
              </Typography>
            </Box>
          </motion.div>
        </>
      )}
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
