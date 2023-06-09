import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: -10,
    transition: {
      type: "spring",
      bounce: 0.6,
      duration: 1,
    },
  },
};

function Card({ data }) {
  return (
    <motion.div
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: " 70px",
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}
      />

      <motion.div
        style={{
          fontSize: "164px",
          width: "90%",
          minHeight: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.336)",
          borderRadius: "20px",
          transformOrigin: "10% 60%",
          boxShadow: "3px 2px 5px rgba(0,0,0,0.5)",
          padding: "20px",
        }}
        variants={cardVariants}
      >
        <Typography
          variant="h4"
          color={"white"}
          textAlign={"center"}
          fontWeight={600}
        >
          {data.title}
        </Typography>
        <Typography
          fontSize={"1.2rem"}
          color={"white"}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
        >
          {data.description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Box
            sx={{
              border: "2px solid black",
              p: 1,
              px: 2,
              mt: 3,
              height: 40,
              width: 100,
            }}
          >
            <NavLink to={data.path}>
              <Typography
                color={"white"}
                fontFamily={"Rubik, sans-serif"}
                fontWeight={600}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: " black ",
                  height: 40,
                  width: 110,
                  ml: -4.5,
                  textAlign: "center",
                  transition: "scale 0.3s ease-in-out",
                  "&:hover": {
                    scale: "0.95 !important",
                  },
                }}
              >
                Visit <KeyboardDoubleArrowRightIcon />
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  );
}

const data = [
  {
    title: "Workout Plans",
    description:
      "Get a customized workout plan designed by experienced trainers based on your goals, fitness level, and schedule, and achieve your fitness objectives with our expert guidance.",
    path: "/workout-plans",
  },
  {
    title: "Diet Plans",
    description:
      "Get a customized diet plan designed by experienced nutritionists based on your goals and individual needs, and achieve optimal health and wellness with our expert guidance.",
    path: "/diet-plans",
  },
  {
    title: "Gym Essentials Store",
    description:
      "Our fitness website offers an online store with a wide range of high-quality fitness products and equipment. We provide convenient online ordering and fast, reliable shipping",
    path: "/show-all-products",
  },
  {
    title: "Fitness Blogs",
    description:
      "Our fitness website offers a comprehensive blog section covering a wide range of topics related to fitness, health, and wellness.",
    path: "/show-all",
  },
  {
    title: "Find Gym Nearby",
    description:
      "Our fitness website offers a convenient tool to help you find nearby gyms and fitness centers. With our easy-to-use platform, you can quickly find any gym in your area.",
    path: "/map",
  },
  {
    title: "Find Nutrition Facts",
    description:
      "Our fitness website offers a comprehensive Nutritional Fact Finder tool to help you make informed decisions about your diet. Enter food item and get its nutritional content.",
    path: "/nutrition-facts",
  },
];

export default function MobileViewServices() {
  return data.map((data, index) => <Card data={data} key={index} />);
}
