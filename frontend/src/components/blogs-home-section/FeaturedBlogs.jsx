import React, { useEffect, useState } from "react";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import axios from "axios";
import { NavLink } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const FeaturedBlogs = ({ id }) => {
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
    <Box>
      <Box my={5}>
        <Typography
          display={"flex"}
          gap={1}
          variant={windowWidth < 810 ? "h5" : "h4"}
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
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <>
            {" "}
            {allBlogs.map((data, index) =>
              data._id !== id ? (
                <Card sx={{ position: "relative", my: 2 }} key={index}>
                  <CardContent>
                    <Typography
                      key={index}
                      variant="h5"
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default FeaturedBlogs;
