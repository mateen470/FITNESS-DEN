import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Box, Rating, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ReactImageMagnify from "react-image-magnify";
import Footer from "../../home-sections/Footer";
import userSmoke from "../../../assets/user-smoke.svg";
import axios from "axios";
import AddToCart from "./AddToCart";
import RelevantProducts from "./RelevantProducts";
// import ProductComments from "./ProductComments";

const ViewSingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [sideImageOne, setSideImageOne] = useState("");
  const [sideImageTwo, setSideImageTwo] = useState("");

  const FetchProduct = async (productId) => {
    await axios.get(`product/single-product/${productId}`).then((res) => {
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
    FetchProduct(id);
  }, [id]);

  return (
    <>
      <Box
        sx={{
          p: 3,
          backgroundImage: `url(${userSmoke})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ position: "absolute", top: 0, left: 5 }}>
          <NavLink to={"/show-all-products"}>
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 7,
            background: "white",
            p: 5,
            pl: 7,
            my: 3,
            borderRadius: 2,
          }}
        >
          <Box>
            <Box sx={{ my: 2, position: "relative", zIndex: 100 }}>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "product",
                    isFluidWidth: true,
                    src: mainImage,
                  },
                  largeImage: {
                    src: mainImage,
                    width: 500,
                    height: 500,
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
                  style={{
                    minWidth: "100%",
                    height: "25vh",
                    borderRadius: "10px",
                  }}
                  alt="blog"
                />
              </Box>
              <Box
                sx={{ my: 2, cursor: "pointer" }}
                onClick={() => handleImageToggle(sideImageTwo)}
              >
                <img
                  src={sideImageTwo}
                  style={{
                    minWidth: "100%",
                    height: "25vh",
                    borderRadius: "10px",
                  }}
                  alt="blog"
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              mt: 3,
            }}
          >
            <Typography
              fontSize={"5vw"}
              color={"black"}
              fontWeight={800}
              mt={1}
            >
              {product.title}
            </Typography>
            <Rating defaultValue={5} size="large" readOnly />
            <hr style={{ marginTop: "1rem" }} />
            <Typography
              fontSize={"2.5vw"}
              color={"#3b60ff"}
              fontWeight={800}
              fontFamily={"Roboto, sans-serif"}
              my={1}
              sx={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              Rs.{product.price}
            </Typography>
            <AddToCart />
            <Typography
              fontSize={"2.8vw"}
              color={"black"}
              fontWeight={800}
              fontFamily={"Comme, sans-serif"}
              my={1}
            >
              {product.metaDescription}
            </Typography>

            <Typography
              fontSize={"2vw"}
              color={"black"}
              fontFamily={"Comme, sans-serif"}
              my={1}
              sx={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              {product.content}
            </Typography>
          </Box>
        </Box>
        <RelevantProducts id={id} />
        {/* <ProductComments id={id} /> */}
      </Box>
      <Footer />
    </>
  );
};

export default ViewSingleProduct;
