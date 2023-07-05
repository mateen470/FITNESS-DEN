import React, { useEffect, useRef, useState } from "react";
import { IconButton, Box } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Hero from "../../components/home-sections/Hero";
import Services from "../../components/home-sections/Services";
import FeaturedProducts from "../../components/home-sections/FeaturedProducts";
import FeaturedBlogs from "../../components/home-sections/FeaturedBlogs";
import BMI from "../../components/home-sections/BMI";
import Footer from "../../components/home-sections/Footer";
import ParallaxText from "../../components/home-sections/ParallaxText";

const Home = () => {
  const sectionRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollButton(scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = () => {
    scrollSmoothTo(sectionRef.current.offsetTop);
  };

  const scrollToTop = () => {
    scrollSmoothTo(0);
  };

  const scrollSmoothTo = (position) => {
    const duration = 400;
    const startingY = window.pageYOffset;
    const diff = position - startingY;
    let start;

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);
      window.scrollTo(0, startingY + diff * percent);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  };
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
        position: "relative",
        backgroundImage:
          "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779141/user-smoke_artunt.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Hero scrollToSection={scrollToSection} />
      <ParallaxText />
      <Box ref={sectionRef}>
        <Services />
      </Box>
      <FeaturedProducts />
      <FeaturedBlogs />
      <BMI />
      <Footer />

      {showScrollButton && (
        <IconButton
          sx={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            borderRadius: "50%",
            background: "white",
            zIndex: 999,
          }}
          onClick={scrollToTop}
        >
          <KeyboardDoubleArrowUpIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Home;
