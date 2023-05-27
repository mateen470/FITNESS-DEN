import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import axios from "axios";
import { NavLink } from "react-router-dom";

const FeaturedBlogs = ({ id }) => {
  const [allBlogs, setAllBlogs] = useState([]);

  const FetchAllBlogs = async () => {
    await axios.get("blog/all-blogs").then((res) => setAllBlogs(res.data.data));
  };

  useEffect(() => {
    FetchAllBlogs();
  }, [allBlogs]);

  return (
    <Container>
      <Box my={5}>
        <Typography
          display={"flex"}
          gap={1}
          fontSize={"3.5vw"}
          color={"white"}
          fontWeight={800}
          textAlign={"left"}
          fontFamily={"Comme, sans-serif"}
          whiteSpace={"nowrap"}
        >
          Relevant Blogs
          <Box pt={1}>
            <AutoStoriesIcon fontSize="5rem" />
          </Box>
        </Typography>
        {allBlogs.map((data, index) =>
          data._id !== id ? (
            <Card sx={{ position: "relative", my: 2 }}>
              <CardContent>
                <Typography
                  key={index}
                  fontSize={"2vw"}
                  color={"black"}
                  fontWeight={600}
                  textAlign={"left"}
                  fontFamily={"Comme, sans-serif"}
                >
                  {data.title}
                </Typography>
                <Typography
                  fontSize={"1.1rem"}
                  color={"black"}
                  mt={1}
                  mb={5}
                  fontFamily={"Comme, sans-serif"}
                >
                  {data.metaDescription}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  position: "absolute",
                  bottom: 5,
                  left: 5,
                }}
              >
                <NavLink to={`/view-blog-home/${data._id}`}>
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
          ) : (
            ""
          )
        )}
      </Box>
    </Container>
  );
};

export default FeaturedBlogs;
