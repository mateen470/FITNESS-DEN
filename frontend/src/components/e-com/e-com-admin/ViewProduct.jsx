import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import axios from "axios";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");

  const FetchProduct = async () => {
    await axios
      .get(`product/single-product/${id}`)
      .then((res) => setProduct(res.data.data));
  };
  useEffect(() => {
    FetchProduct();
  }, [product]);

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
      <Box sx={{ my: 2 }}>
        <img
          src={product.mainImage}
          style={{ minWidth: "100%", height: "50vh", borderRadius: "10px" }}
          alt="blog"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ my: 2 }}>
          <img
            src={product.sideImageOne}
            style={{ minWidth: "100%", height: "25vh", borderRadius: "10px" }}
            alt="blog"
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <img
            src={product.sideImageTwo}
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
        {product.info}
      </Typography>
    </Container>
  );
};
export default ViewProduct;
