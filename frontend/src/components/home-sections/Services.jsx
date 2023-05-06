import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Modal,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import blogCard from "../../assets/blogCard.svg";
import blogSide from "../../assets/blogSide.svg";
import dietCard from "../../assets/dietCard.svg";
import dietSide from "../../assets/dietSide.svg";
import foodCard from "../../assets/foodCard.svg";
import foodSide from "../../assets/foodSide.svg";
import gymCard from "../../assets/gymCard.svg";
import gymSide from "../../assets/gymSide.svg";
import storeCard from "../../assets/storeCard.svg";
import storeSide from "../../assets/storeSide.svg";
import workoutCard from "../../assets/workoutCard.svg";
import workoutSide from "../../assets/workoutSide.svg";

const cardsData = [
  {
    id: 1,
    title: "Workout Plans",
    description:
      "Get a customized workout plan designed by experienced trainers based on your goals, fitness level, and schedule, and achieve your fitness objectives with our expert guidance.",
    expandedContent:
      "Our workout plan service offers a comprehensive approach to help you achieve your fitness goals. Our expert trainers will design a customized program based on your individual needs, including your current fitness level, goals, and schedule. Our plans include a variety of exercises to target different muscle groups and provide a well-rounded fitness experience.",
    cardImage: workoutCard,
    sideImage: workoutSide,
    path: "/",
  },
  {
    id: 2,
    title: "Diet Plans",
    description:
      "Get a customized diet plan designed by experienced nutritionists based on your goals and individual needs, and achieve optimal health and wellness with our expert guidance.",
    expandedContent: `Our diet plan service offers a comprehensive approach to help you achieve your health and wellness goals. Our expert nutritionists will design a customized program based on your individual needs, including your current diet, goals, and lifestyle. Our plans include a variety of options to accommodate different dietary preferences, including vegetarian and gluten-free options.`,
    cardImage: dietCard,
    sideImage: dietSide,
    path: "/",
  },
  {
    id: 3,
    title: "Gym Essentials Store",
    description:
      "Our fitness website offers an online store with a wide range of high-quality fitness products and equipment. We provide convenient online ordering and fast, reliable shipping",
    expandedContent: `Our online store offers a comprehensive range of fitness products and equipment to help you achieve your fitness objectives. We provide high-quality products that are designed to be durable and effective, from weights and resistance bands to yoga mats and workout apparel. Our online ordering system is convenient and easy to use, and we offer fast, reliable shipping to ensure that your products arrive quickly and in good condition. With our wide selection and competitive prices, we make it easy for you to find the products you need to reach your fitness goals.
    `,
    cardImage: storeCard,
    sideImage: storeSide,
    path: "/",
  },
  {
    id: 4,
    title: "Fitness Blogs",
    description:
      "Our fitness website offers a comprehensive blog section covering a wide range of topics related to fitness, health, and wellness.",
    expandedContent: `Our fitness blog section provides a wealth of information on a variety of topics related to fitness and wellness. Our expert writers cover everything from workout tips and nutrition advice to the latest trends in fitness and the science behind exercise. Our articles are informative, engaging, and easy to understand, making them a valuable resource for anyone looking to improve their health and fitness. 
    `,
    cardImage: blogCard,
    sideImage: blogSide,
    path: "/",
  },
  {
    id: 5,
    title: "Find Gym Nearby",
    description:
      "Our fitness website offers a convenient tool to help you find nearby gyms and fitness centers. With our easy-to-use platform, you can quickly find and compare gym options in your area.",
    expandedContent: `Our gym finder service makes it easy to find nearby gyms and fitness centers that meet your specific needs. Our search feature allows you to filter by location. We provide detailed information about each gym, including hours of operation and reviews to help you make an informed decision. With our easy-to-use platform, you can compare and contrast different gyms in your area to find the perfect fit for your workout routine. Whether you're a seasoned gym-goer or just starting out, our gym finder is a valuable resource to help you achieve your fitness goals.
    `,
    cardImage: gymCard,
    sideImage: gymSide,
    path: "/",
  },
  {
    id: 6,
    title: "Find Nutrition Facts",
    description:
      "Our fitness website offers a comprehensive Nutritional Fact Finder tool to help you make informed decisions about your diet. Simply enter the food item you're curious about and get detailed information on its nutritional content.",
    expandedContent: `Our Nutritional Fact Finder tool is a powerful resource designed to help you make informed decisions about your diet. With this tool, you can easily find detailed nutritional information on a wide range of foods. Simply enter the food item you're curious about, and our tool will provide nutritional information. Armed with this information, you can make smarter choices about what you eat and ensure that you're getting the right balance of nutrients to support your health and fitness goals. Our Nutritional Fact Finder tool is a valuable resource for anyone looking to take control of their diet and achieve optimal health.`,
    cardImage: foodCard,
    sideImage: foodSide,
    path: "/",
  },
];

const CustomCard = ({ data }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <Box position="relative">
      <Card
        onClick={handleClick}
        sx={{
          width: "100%",
          height: "100%",
          padding: 2,
          cursor: "pointer",
          background: "rgba(255, 255, 255, 0.336)",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            right: 5,
            top: 3,
            opacity: 0.5,
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <LaunchIcon />
        </Typography>
        <CardContent>
          <Typography variant="h4" color={"white"} textAlign={"center"}>
            {data.title}
          </Typography>
          <Typography
            fontSize={"1.2rem"}
            color={"white"}
            textAlign={"left"}
            fontFamily={"Comme, sans-serif"}
          >
            {data.description}
          </Typography>
        </CardContent>
      </Card>

      <Modal
        open={isExpanded}
        onClose={handleClose}
        sx={{
          outline: "none",
        }}
      >
        <Paper
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "80%",
            padding: 2,
            overflowY: "auto",
            border: "none",
            outline: "none",
            backgroundImage: `url(${data.cardImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            elevation: 0,
          }}
          onClick={handleClose}
        >
          <Typography variant="h3" component="div" textAlign={"center"}>
            {data.title}
          </Typography>
          <Typography
            fontSize={"1.4rem"}
            color={"black"}
            textAlign={"center"}
            fontFamily={"Comme, sans-serif"}
          >
            {data.expandedContent}
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
        </Paper>
      </Modal>
    </Box>
  );
};
const Services = () => {
  useEffect(() => {
    preloadImages();
  }, []);

  const preloadImages = () => {
    cardsData.forEach((data) => {
      const img = new Image();
      img.src = data.cardImage;
    });
  };
  return (
    <Container>
      <Typography
        color={"white"}
        variant="h2"
        textAlign={"center"}
        my={4}
        sx={{ textShadow: "3px 0px 0px purple", fontWeight: 800 }}
      >
        What we Offer!
      </Typography>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        rowSpacing={2}
      >
        {cardsData.map((data, index) => (
          <React.Fragment key={data.id}>
            {index % 2 === 0 ? (
              <>
                <Grid item xs={6}>
                  <CustomCard data={data} />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={data.sideImage}
                    alt="CARD IMAGES"
                    style={{
                      width: index === 0 ? "300px" : "250px",
                      height: index === 0 ? "200px" : "250px",
                    }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={data.sideImage}
                    alt="CARD IMAGES"
                    style={{
                      width: index === 1 || index === 5 ? "300px" : "250px",
                      height: index === 1 || index === 5 ? "300px" : "250px",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomCard data={data} />
                </Grid>
              </>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
