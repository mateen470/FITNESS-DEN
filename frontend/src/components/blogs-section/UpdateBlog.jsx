import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    metaDescription: "",
    mainData: "",
  });
  const { title, image, metaDescription, mainData } = blogData;

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setBlogData({ ...blogData, [name]: value });
  };

  useEffect(() => {
    const fetchBlog = async () => {
      const getBlog = await axios.get(`blog/single-blog/${id}`);
      const fetchedBlog = getBlog.data.data;
      setBlogData({
        title: fetchedBlog.title,
        image: fetchedBlog.image,
        metaDescription: fetchedBlog.metaDescription,
        mainData: fetchedBlog.mainData,
      });
    };
    fetchBlog();
  }, [id]);

  const updateBlog = async () => {
    try {
      const updateBlog = await axios.put(`blog/update-blog/${id}`, {
        title,
        image,
        metaDescription,
        mainData,
      });
      if (updateBlog.data && updateBlog.data.success) {
        toast.success(updateBlog.data.message);
        navigate("/admin");
      }
      if (
        updateBlog.response &&
        updateBlog.response.data &&
        updateBlog.response.data.message
      ) {
        toast.error(updateBlog.response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
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
      <Typography
        fontSize={"4.5vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        mt={4}
        mb={2}
      >
        Update Blog
      </Typography>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
          zIndex: 10,
          p: 3,
          my: 2,
        }}
      >
        <Typography
          fontSize={"3vw"}
          color={"white"}
          fontWeight={800}
          textAlign={"center"}
          fontFamily={"Comme, sans-serif"}
          my={4}
        >
          please fill in the form!
        </Typography>
        <TextField
          placeholder="Add Title"
          name={"title"}
          value={blogData.title}
          onChange={handleInputChange}
          sx={{
            background: "none",
            color: "white",
            borderBottom: "1px solid white",
            "& .MuiOutlinedInput-root": {
              fontSize: "1.2rem",
              "& fieldset": {
                borderWidth: "0",
              },
              "&:hover fieldset": {
                borderWidth: "0",
              },
              "&.Mui-focused fieldset": {
                borderWidth: "0",
              },
              "& .MuiOutlinedInput-input": {
                overflow: "auto",
                color: "white",
              },
            },
          }}
        />
        <TextField
          placeholder="Add New Image"
          name={"image"}
          value={blogData.image}
          onChange={handleInputChange}
          sx={{
            background: "none",
            color: "white",
            borderBottom: "1px solid white",
            "& .MuiOutlinedInput-root": {
              fontSize: "1.2rem",
              "& fieldset": {
                borderWidth: "0",
              },
              "&:hover fieldset": {
                borderWidth: "0",
              },
              "&.Mui-focused fieldset": {
                borderWidth: "0",
              },
              "& .MuiOutlinedInput-input": {
                overflow: "auto",
                color: "white",
              },
            },
          }}
        />
        <TextField
          placeholder="Add Description"
          name={"metaDescription"}
          value={blogData.metaDescription}
          onChange={handleInputChange}
          sx={{
            background: "none",
            color: "white",
            borderBottom: "1px solid white",
            "& .MuiOutlinedInput-root": {
              fontSize: "1.2rem",
              "& fieldset": {
                borderWidth: "0",
              },
              "&:hover fieldset": {
                borderWidth: "0",
              },
              "&.Mui-focused fieldset": {
                borderWidth: "0",
              },
              "& .MuiOutlinedInput-input": {
                overflow: "auto",
                color: "white",
              },
            },
          }}
        />
        <TextField
          multiline
          rows={4}
          placeholder="main content of blog"
          sx={{
            minWidth: "50vw",
            minHeight: "3vw",
            borderRadius: 1,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
            color: "white",
            fontWeight: "bold",
            "& .MuiOutlinedInput-root": {
              fontSize: "1.2rem",
              "& fieldset": {
                borderWidth: "0",
              },
              "&:hover fieldset": {
                borderWidth: "0",
              },
              "&.Mui-focused fieldset": {
                borderWidth: "0",
              },
              "& .MuiOutlinedInput-input": {
                overflow: "auto",
                color: "white",
              },
            },
          }}
          name={"mainData"}
          value={blogData.mainData}
          onChange={handleInputChange}
        />
      </Box>
      <Button
        sx={{ textTransform: "none", background: "white", mb: 10, mt: 1 }}
        onClick={updateBlog}
      >
        <Typography
          color={"black"}
          fontFamily={"Comme, sans-serif"}
          fontSize={"1.5vw"}
          fontWeight={800}
        >
          Update
        </Typography>
      </Button>
    </Container>
  );
};

export default UpdateBlog;
