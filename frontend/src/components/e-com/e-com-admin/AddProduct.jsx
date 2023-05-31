import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    mainImage: "",
    sideImageOne: "",
    sideImageTwo: "",
    metaDescription: "",
    info: "",
    price: "",
  });
  const {
    title,
    mainImage,
    sideImageOne,
    sideImageTwo,
    metaDescription,
    info,
    price,
  } = productData;

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const addProduct = async () => {
    try {
      const addProduct = await axios.post("product/add-product", {
        title,
        mainImage,
        sideImageOne,
        sideImageTwo,
        metaDescription,
        info,
        price,
      });
      if (addProduct.data && addProduct.data.success) {
        toast.success(addProduct.data.message);
        navigate("/admin");
      }
      if (
        addProduct.response &&
        addProduct.response.data &&
        addProduct.response.data.message
      ) {
        toast.error(addProduct.response.data.message);
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
        Add Product
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
          value={productData.title}
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
          placeholder="Add Main Image"
          name={"mainImage"}
          value={productData.mainImage}
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
          placeholder="Add First Side Image"
          name={"sideImageOne"}
          value={productData.sideImageOne}
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
          placeholder="Add Second Side Image"
          name={"sideImageTwo"}
          value={productData.sideImageTwo}
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
          value={productData.metaDescription}
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
          placeholder="Add Price (Pkr.)"
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
          name={"price"}
          value={productData.price}
          onChange={handleInputChange}
        />
        <TextField
          multiline
          rows={4}
          placeholder="main content of product"
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
          name={"info"}
          value={productData.info}
          onChange={handleInputChange}
        />
      </Box>
      <Button
        sx={{ textTransform: "none", background: "white", mb: 10, mt: 1 }}
        onClick={addProduct}
      >
        <Typography
          color={"black"}
          fontFamily={"Comme, sans-serif"}
          fontSize={"1.5vw"}
          fontWeight={800}
        >
          Add
        </Typography>
      </Button>
    </Container>
  );
};

export default AddProduct;
