import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Footer from "../home-sections/Footer";
import axios from "axios";
import FeaturedBlogs from "./FeaturedBlogs";
import userSmoke from "../../assets/user-smoke.svg";
import Comments from "./Comments";

const ViewSingleBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState("");

  const FetchBlog = async () => {
    await axios
      .get(`blog/single-blog/${id}`)
      .then((res) => setBlog(res.data.data));
  };
  useEffect(() => {
    FetchBlog();
  }, [blog]);

  return (
    <>
      <Grid
        container
        p={3}
        sx={{
          backgroundImage: `url(${userSmoke})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid item xs={8}>
          <Box
            sx={{
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              my: 5,
              borderRadius: 2,
            }}
          >
            <Box sx={{ position: "absolute", top: 0, left: 5 }}>
              <NavLink to={"/show-all"}>
                <Typography
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.7vw",
                  }}
                >
                  <KeyboardDoubleArrowLeftIcon /> Back
                </Typography>
              </NavLink>
            </Box>
            <Typography
              fontSize={"3.2vw"}
              color={"black"}
              fontWeight={800}
              textAlign={"left"}
              fontFamily={"Comme, sans-serif"}
              my={1}
              px={3}
            >
              {blog.title}
            </Typography>
            <Box>
              <img
                src={blog.image}
                style={{
                  width: "60vw",
                  height: "35vw",
                  objectFit: "fill",
                  borderRadius: "5px",
                }}
                alt="blog"
              />
            </Box>
            <Typography
              fontSize={"2.5vw"}
              color={"black"}
              fontWeight={800}
              textAlign={"left"}
              fontFamily={"Comme, sans-serif"}
              my={1}
              px={2}
            >
              {blog.metaDescription}
            </Typography>

            <Typography
              fontSize={"1.9vw"}
              color={"black"}
              textAlign={"left"}
              fontFamily={"Comme, sans-serif"}
              my={1}
              px={2}
            >
              {blog.content &&
                blog.content.split("\n\n").map((paragraph, index) => (
                  <React.Fragment key={index}>
                    {paragraph}
                    <br />
                    <br />
                  </React.Fragment>
                ))}
            </Typography>
          </Box>
          <Box mt={3}>
            <Comments id={id} />
          </Box>
          {blog.comments && blog.comments.length > 0 && (
            <Box sx={{ background: "white", borderRadius: 2, p: 3, my: 3 }}>
              <Typography
                fontSize={"3vw"}
                color={"black"}
                fontWeight={800}
                textAlign={"left"}
                fontFamily={"Comme, sans-serif"}
                mb={2}
              >
                Comments
              </Typography>
              {blog.comments.map((blogComments, index) => (
                <Box mb={3} key={index}>
                  <Typography
                    fontSize={"1rem"}
                    color={"#696969"}
                    fontWeight={800}
                    textAlign={"left"}
                    fontFamily={"Comme, sans-serif"}
                  >
                    {blogComments.nameOfUser}
                  </Typography>
                  <Typography
                    fontSize={"1rem"}
                    color={"black"}
                    textAlign={"left"}
                    fontFamily={"Comme, sans-serif"}
                  >
                    {blogComments.comment}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Grid>
        <Grid item xs={4}>
          <FeaturedBlogs id={id} />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default ViewSingleBlogPage;
