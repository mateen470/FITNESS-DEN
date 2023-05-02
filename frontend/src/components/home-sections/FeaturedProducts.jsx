import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
const FeaturedProducts = () => {
  const productData = [
    { title: "1st prd", desc: "ncancbnbcjc" },
    { title: "2st prd", desc: "ncancbnbcjc" },
    { title: "3st prd", desc: "ncancbnbcjc" },
  ];

  return (
    <Container>
      <Typography color={"white"} variant="h2" textAlign={"center"} my={4}>
        Our Hotest Products
      </Typography>
      <Grid container spacing={2}>
        {productData.map((cardData, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Card>
                <Typography variant="h5">{cardData.title}</Typography>
                <CardContent>{cardData.desc}</CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default FeaturedProducts;
