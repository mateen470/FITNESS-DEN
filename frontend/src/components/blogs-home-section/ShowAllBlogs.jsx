import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../home-sections/Footer";
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import axios from "axios";

const ShowAllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  const FetchAllBlogs = async () => {
    await axios.get("blog/all-blogs").then((res) => setAllBlogs(res.data.data));
  };
  useEffect(() => {
    FetchAllBlogs();
  }, [allBlogs]);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          mb: 5,
        }}
      >
        <Box sx={{ position: "absolute", top: 0, left: 5 }}>
          <NavLink to={"/"}>
            <Typography
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
            >
              <KeyboardDoubleArrowLeftIcon /> Back
            </Typography>
          </NavLink>
        </Box>
        <Typography
          fontSize={"4.5vw"}
          color={"white"}
          fontWeight={800}
          textAlign={"center"}
          mt={4}
          mb={2}
        >
          All Blogs
        </Typography>
        <Grid container spacing={2}>
          {allBlogs.map((cardData, index) => {
            return (
              <Grid item xs={4} key={index}>
                <Card sx={{ height: "33rem", position: "relative" }}>
                  <CardMedia
                    component="img"
                    alt="card image"
                    height="250"
                    sx={{ objectFit: "cover" }}
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
                      {cardData.metaDescription}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      left: 5,
                    }}
                  >
                    <NavLink to={`/view-blog-home/${cardData._id}`}>
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
                  <CardActions
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography
                        fontSize={"1.5vw"}
                        color={"black"}
                        fontWeight={800}
                        fontFamily={"Comme, sans-serif"}
                      >
                        {cardData.numberOfLikes}
                      </Typography>
                      <ThumbUpIcon sx={{ fontSize: "1.4rem" }} />
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography
                        fontSize={"1.5vw"}
                        color={"black"}
                        fontWeight={800}
                        fontFamily={"Comme, sans-serif"}
                      >
                        {cardData.numberOfDislikes}
                      </Typography>
                      <ThumbDownAltIcon />
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ShowAllBlogs;
