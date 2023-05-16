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
                <Card>
                  <CardMedia
                    component="img"
                    alt="card image"
                    height="200"
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
      <Footer />
    </>
  );
};

export default ShowAllBlogs;