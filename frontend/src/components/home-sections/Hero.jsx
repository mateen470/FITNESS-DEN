import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import bannerImage from "../../assets/banner.svg";
import NavBar from "./NavBar";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const aspectRatio = 1;
  const minHeight = Math.max(
    width * aspectRatio,
    (40 * window.innerHeight) / 100
  );

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
        minHeight: `${minHeight}px`,
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
                sx={{ fontSize: "5vw" }}
              >
                own your
                <Typography
                  style={{
                    background:
                      " linear-gradient( rgba(92, 58, 180, 1) ,rgba(134, 69, 252, 1) ) ",
                    backgroundClip: "text",
                    webkitBackgroundClip: "text",
                    color: "transparent",
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
    </Container>
  );
};

export default Hero;
