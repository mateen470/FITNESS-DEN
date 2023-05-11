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
import { NavLink } from "react-router-dom";
import dumbell from "../../assets/dumbell.svg";
import roller from "../../assets/roller.svg";
import band from "../../assets/band.svg";
const FeaturedProducts = () => {
  const productData = [
    {
      title: "Resistance Band Set",
      desc: "Versatile, durable set of resistance bands for at-home workouts, with different resistance levels.",
      image: band,
      price: "1000.00",
    },
    {
      title: "Adjustable Dumbbell",
      desc: "Easy-to-use, high-quality adjustable dumbbells for a variety of exercises and fitness levels.",
      image: dumbell,
      price: "1000.00",
    },
    {
      title: "Foam Roller",
      desc: "High-density foam roller for post-workout recovery, made for muscle soreness and stiffness.",
      image: roller,
      price: "1000.00",
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
        Our Hotest Products
      </Typography>
      <Grid container spacing={2}>
        {productData.map((cardData, index) => {
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
                    ml: 1,
                  }}
                >
                  <Box>
                    PRICE :
                    <Typography variant="h7" fontFamily={"Comme, sans-serif"}>
                      {cardData.price}
                    </Typography>
                    Rs.
                  </Box>
                </CardActions>
                <CardActions sx={{ ml: 0.5, mb: 2 }}>
                  <NavLink to="/">
                    <Typography
                      sx={{
                        px: 2,
                        background: "black",
                        color: "white",
                        borderRadius: 1,
                      }}
                    >
                      View
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

export default FeaturedProducts;
