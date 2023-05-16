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
import { NavLink } from "react-router-dom";
import axios from "axios";
const FeaturedBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);

  const FetchBlogs = async () => {
    await axios.get("blog/all-blogs").then((res) => {
      setAllBlogs(res.data.data);
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
          variant="h2"
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
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "2vw",
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
                    {cardData.metaDescription}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    ml: 0.5,
                    mb: 2,
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
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default FeaturedBlogs;
