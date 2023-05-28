import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Grid, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Footer from "../home-sections/Footer";
import axios from "axios";
import FeaturedBlogs from "./FeaturedBlogs";
import userSmoke from "../../assets/user-smoke.svg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Comments from "./Comments";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewSingleBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const userId = useSelector((state) => state.CurrentUser.CurrentUserID);
  const { isUser } = useSelector((state) => state.CheckForUserType);

  const FetchBlog = async () => {
    await axios
      .get(`blog/single-blog/${id}`)
      .then((res) => setBlog(res.data.data));
  };

  const likeBlog = async () => {
    try {
      const likeBlogResponse = await axios.put(`blog/like-blog/${id}`, {
        userId,
      });
      if (
        likeBlogResponse.response &&
        likeBlogResponse.response.data &&
        likeBlogResponse.response.data.message
      ) {
        toast.error(likeBlogResponse.response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const dislikeBlog = async () => {
    try {
      const disLikeBlogResponse = await axios.put(`blog/dislike-blog/${id}`, {
        userId,
      });
      if (
        disLikeBlogResponse.response &&
        disLikeBlogResponse.response.data &&
        disLikeBlogResponse.response.data.message
      ) {
        toast.error(disLikeBlogResponse.response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const notAccessible = () => {
    toast.error("LOGIN FIRST!!");
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
              mt: 5,
              mb: 2,
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

          {isUser ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                mb: 3,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "black",
                  pl: 3,
                  py: 0,
                  height: "2.5rem",
                  borderRadius: 1,
                }}
              >
                <Typography
                  fontSize={"2vw"}
                  color={"white"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  {blog.numberOfLikes}
                </Typography>
                <Button
                  sx={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "white",
                  }}
                  onClick={likeBlog}
                >
                  <ThumbUpIcon sx={{ fontSize: "2.2rem" }} />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "black ",
                  pl: 3,
                  py: 0,
                  height: "2.5rem",
                  borderRadius: 1,
                }}
              >
                <Typography
                  fontSize={"2vw"}
                  color={"white"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  {blog.numberOfDislikes}
                </Typography>
                <Button
                  sx={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "white",
                  }}
                  onClick={dislikeBlog}
                >
                  <ThumbDownAltIcon sx={{ fontSize: "2.5rem" }} />
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                mb: 3,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "black",
                  pl: 3,
                  py: 0,
                  height: "2.5rem",
                  borderRadius: 1,
                }}
              >
                <Typography
                  fontSize={"2vw"}
                  color={"white"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  {blog.numberOfLikes}
                </Typography>
                <Button
                  sx={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "white",
                  }}
                  onClick={notAccessible}
                >
                  <ThumbUpIcon sx={{ fontSize: "2.2rem" }} />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "black ",
                  pl: 3,
                  py: 0,
                  height: "2.5rem",
                  borderRadius: 1,
                }}
              >
                <Typography
                  fontSize={"2vw"}
                  color={"white"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  {blog.numberOfDislikes}
                </Typography>
                <Button
                  sx={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "white",
                  }}
                  onClick={notAccessible}
                >
                  <ThumbDownAltIcon sx={{ fontSize: "2.5rem" }} />
                </Button>
              </Box>
            </Box>
          )}

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
                    fontSize={"1.7vw"}
                    color={"#696969"}
                    fontWeight={800}
                    textAlign={"left"}
                    fontFamily={"Comme, sans-serif"}
                  >
                    {blogComments.nameOfUser}
                  </Typography>
                  <Typography
                    fontSize={"1.5vw"}
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
