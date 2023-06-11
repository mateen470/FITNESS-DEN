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
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import NavBar from "../home-sections/NavBar";

const ShowAllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const FetchAllBlogs = async () => {
    setIsLoading(true);
    await axios
      .get("blog/all-blogs")
      .then((res) => {
        setAllBlogs(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    FetchAllBlogs();
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
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 10 }}>
          <NavBar />
        </Box>
        <Typography
          variant={
            windowWidth < 900 && windowWidth > 500
              ? "h3"
              : windowWidth < 500
              ? "h4"
              : "h2"
          }
          color={"white"}
          fontWeight={800}
          textAlign={"center"}
          mt={12}
          mb={2}
        >
          All Blogs
        </Typography>
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Grid container spacing={2}>
            {allBlogs.map((cardData, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ height: 565, position: "relative" }}>
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
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
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
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ShowAllBlogs;
