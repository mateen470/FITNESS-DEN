import React, { useRef } from "react";
import Hero from "../../components/home-sections/Hero";
import Services from "../../components/home-sections/Services";
import { Box } from "@mui/material";
const Home = () => {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Box>
      <Hero scrollToSection={scrollToSection} />
      <Box ref={sectionRef}>
        <Services />
      </Box>
    </Box>
  );
};

export default Home;
