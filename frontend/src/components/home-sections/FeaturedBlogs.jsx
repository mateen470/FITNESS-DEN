import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
const FeaturedBlogs = () => {
  const blogsData = [
    { title: "1st blog", desc: "ncancbnbcjc" },
    { title: "2st blog", desc: "ncancbnbcjc" },
    { title: "3st blog", desc: "ncancbnbcjc" },
  ];

  return (
    <Container>
      <Typography color={"white"} variant="h2" textAlign={"center"} my={4}>
        Our Latest Blogs
      </Typography>
      <Grid container spacing={2}>
        {blogsData.map((cardData, index) => {
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

export default FeaturedBlogs;
