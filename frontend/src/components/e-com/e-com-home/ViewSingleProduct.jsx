import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ReactImageMagnify from "react-image-magnify";
import axios from "axios";

const ViewSingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [sideImageOne, setSideImageOne] = useState("");
  const [sideImageTwo, setSideImageTwo] = useState("");

  const FetchProduct = async () => {
    await axios.get(`product/single-product/${id}`).then((res) => {
      setProduct(res.data.data);
      setMainImage(res.data.data.mainImage);
      setSideImageOne(res.data.data.sideImageOne);
      setSideImageTwo(res.data.data.sideImageTwo);
    });
  };
  const handleImageToggle = (image) => {
    if (image === sideImageOne) {
      setMainImage(sideImageOne);
      setSideImageOne(mainImage);
    } else if (image === sideImageTwo) {
      setMainImage(sideImageTwo);
      setSideImageTwo(mainImage);
    }
  };

  useEffect(() => {
    FetchProduct();
  }, []);

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
        <NavLink to={"/show-all-products"}>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            sx={{ display: "flex", alignItems: "center", fontSize: "1.7vw" }}
          >
            <KeyboardDoubleArrowLeftIcon /> Back
          </Typography>
        </NavLink>
      </Box>
      <Box sx={{ my: 2 }}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "product",
              src: mainImage,
              width: 270,
              height: 300,
            },
            largeImage: {
              src: mainImage,
              width: 800,
              height: 800,
            },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{ my: 2, cursor: "pointer" }}
          onClick={() => handleImageToggle(sideImageOne)}
        >
          <img
            src={sideImageOne}
            style={{ minWidth: "100%", height: "25vh", borderRadius: "10px" }}
            alt="blog"
          />
        </Box>
        <Box
          sx={{ my: 2, cursor: "pointer" }}
          onClick={() => handleImageToggle(sideImageTwo)}
        >
          <img
            src={sideImageTwo}
            style={{ minWidth: "100%", height: "25vh", borderRadius: "10px" }}
            alt="blog"
          />
        </Box>
      </Box>
      <Typography
        fontSize={"3vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        fontFamily={"Comme, sans-serif"}
        my={1}
      >
        {product.title}
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
        {product.price} Pkr.
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
        {product.metaDescription}
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
        {product.content}
      </Typography>
    </Container>
  );
};

export default ViewSingleProduct;
