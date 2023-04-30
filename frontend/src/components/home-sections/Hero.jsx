import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import bannerImage from "../../assets/banner.svg";
import { motion } from "framer-motion";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container
      sx={{
        backgroundImage: `url(${bannerImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
      }}
    >
      {isLoaded && (
        <motion.div
          initial={{ x: -200, y: 150 }}
          animate={{ x: 10, y: 150 }}
          transition={{ duration: 1, type: "spring", bounce: 0.6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h2"
              color={"white"}
              fontFamily="Lato, sans-serif"
              display={"inline-block"}
            >
              Own Your
              <Typography
                style={{
                  backgroundImage: "linear-gradient(#790D83, #7A5CFF)",
                  backgroundClip: "text",
                  webkitBackgroundClip: "text",
                  color: "transparent",
                }}
                variant="h1"
                color={"white"}
                fontFamily="Lato, sans-serif"
                display={"inline-block"}
                ml={1}
              >
                Fitness
              </Typography>
            </Typography>
            <Typography
              variant="h5"
              color={"white"}
              fontFamily="Lato, sans-serif"
              ml={1}
            >
              The All-in-One Solution for a Fit and Healthy You!
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 5,
                ml: 15,
              }}
            >
              <NavLink>
                <Typography
                  sx={{
                    backgroundImage:
                      "linear-gradient(to left,#790D83, #7A5CFF)",
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    textAlign: "center",
                    transition: "scale 0.3s ease",
                    "&:hover": {
                      scale: "0.9 !important",
                    },
                  }}
                  variant="h6"
                  color={"white"}
                  fontFamily="Lato, sans-serif"
                >
                  Join Now!
                </Typography>
              </NavLink>
              <NavLink>
                <Typography
                  variant="h6"
                  color={"white"}
                  fontFamily="Lato, sans-serif"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to left,#790D83, #7A5CFF)",
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    textAlign: "center",
                    transition: "scale 0.3s ease",
                    "&:hover": {
                      scale: "0.9 !important",
                    },
                  }}
                >
                  Explore Services
                </Typography>
              </NavLink>
            </Box>
          </Box>
        </motion.div>
      )}
    </Container>
  );
};

export default Hero;
