import React, { useEffect, useState } from "react";
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { NavLink } from "react-router-dom";
import axios from "axios";
const FeaturedBlogs = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const FetchBlogs = async () => {
    await axios.get("blog/all-blogs").then((res) => {
      if (res.data.data.length > 2) {
        setLatestBlogs(res.data.data.slice(-3));
      } else {
        setLatestBlogs(res.data.data);
      }
    });
  };

  useEffect(() => {
    FetchBlogs();
  }, []);

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
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          color={"white"}
          variant={
            windowWidth < 900 && windowWidth > 500
              ? "h3"
              : windowWidth < 500
              ? "h4"
              : "h2"
          }
          textAlign={"center"}
          mt={10}
          sx={{ textShadow: "3px 0px 0px purple", fontWeight: 800 }}
        >
          Our Latest Blogs
        </Typography>
        <Box my={3}>
          <NavLink to={"/show-all"}>
            <Typography
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "3px solid white",
              }}
            >
              View All Blogs
              <KeyboardDoubleArrowRightIcon />
            </Typography>
          </NavLink>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {latestBlogs.map((cardData, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: 550, position: "relative" }}>
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
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography
                      variant="h6"
                      color={"black"}
                      fontWeight={800}
                      fontFamily={"Comme, sans-serif"}
                    >
                      {cardData.numberOfLikes}
                    </Typography>
                    <ThumbUpIcon sx={{ fontSize: "1.4rem" }} />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography
                      variant="h6"
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
  );
};

export default FeaturedBlogs;
