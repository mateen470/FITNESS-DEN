import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import axios from "axios";

const ViewBlog = () => {
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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pt: 2,
      }}
    >
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/admin"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
          >
            <KeyboardDoubleArrowLeftIcon /> Back
          </Typography>
        </NavLink>
      </Box>
      <Box>
        {/* {blog.image}
        <img src={blog.image} style={{ width: "50vh", borderRadius: "10px" }} /> */}
      </Box>

      <Typography
        fontSize={"3vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        fontFamily={"Comme, sans-serif"}
        my={1}
      >
        {blog.title}
      </Typography>
      <Typography
        fontSize={"2.5vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        fontFamily={"Comme, sans-serif"}
        my={1}
        width={"150vh"}
      >
        {blog.metaDescription}
      </Typography>

      <Typography
        fontSize={"1.7vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        fontFamily={"Comme, sans-serif"}
        my={1}
        sx={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          width: "150vh",
        }}
      >
        {blog.content}
      </Typography>
    </Container>
  );
};

export default ViewBlog;
