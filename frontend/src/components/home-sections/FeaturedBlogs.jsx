import React from "react";
import {
  CardActions,
  CardMedia,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { NavLink } from "react-router-dom";
import motivate from "../../assets/motivate.svg";
import yoga from "../../assets/yoga.svg";
import rest from "../../assets/rest.svg";
const FeaturedBlogs = () => {
  const blogsData = [
    {
      title: "5 Ways to Stay Motivated During Your Workouts",
      desc: "Feeling unmotivated to exercise? In this article, we share five practical tips to help you stay motivated and focused on your fitness goals, including setting small achievable goals, finding a workout buddy, and changing up your routine. ",
      image: motivate,
    },
    {
      title: "The Benefits of Yoga for Stress Relief",
      desc: "We explore the ways in which practicing yoga can help reduce stress and anxiety. From breathing techniques to meditation, we share all of the tips on how to use yoga to calm your mind and improve your mental health.",
      image: yoga,
    },
    {
      title: "Why Rest Days Are Important for Fitness",
      desc: "Rest days are often overlooked, but they're a crucial part of any fitness routine. In this article, we explain why rest days are important for your body and mind, and share tips on how to incorporate them into your life.",
      image: rest,
    },
  ];

  return (
    <Container>
      <Typography
        color={"white"}
        variant="h2"
        textAlign={"center"}
        mt={10}
        mb={4}
        sx={{ textShadow: "3px 0px 0px purple", fontWeight: 800 }}
      >
        Our Latest Blogs
      </Typography>
      <Grid container spacing={2}>
        {blogsData.map((cardData, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  alt="card image"
                  height="250"
                  image={cardData.image}
                />
                <Typography
                  variant="h5"
                  color={"black"}
                  textAlign={"center"}
                  mt={2}
                  fontWeight={600}
                  px={1}
                >
                  {cardData.title}
                </Typography>
                <CardContent>
                  <Typography variant="h7" fontFamily={"Comme, sans-serif"}>
                    {cardData.desc}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    ml: 0.5,
                    mb: 2,
                  }}
                >
                  <NavLink to="/">
                    <Typography
                      sx={{
                        px: 2,
                        background: "black",
                        color: "white",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Read More
                      <KeyboardDoubleArrowRightIcon />
                    </Typography>
                  </NavLink>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default FeaturedBlogs;
