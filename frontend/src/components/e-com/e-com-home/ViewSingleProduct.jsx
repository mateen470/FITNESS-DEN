import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Box, Rating, Typography, Button } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Footer from "../../home-sections/Footer";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RelevantProducts from "./RelevantProducts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import ProductComments from "./ProductComments";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ViewSingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [sideImageOne, setSideImageOne] = useState("");
  const [sideImageTwo, setSideImageTwo] = useState("");
  const [rating, setRating] = useState(0);
  const { isUser } = useSelector((state) => state.CheckForUserType);
  const userId = useSelector((state) => state.CurrentUser.CurrentUserID);

  const FetchProduct = async (productId) => {
    await axios.get(`product/single-product/${productId}`).then((res) => {
      setProduct(res.data.data);
      setMainImage(res.data.data.mainImage);
      setSideImageOne(res.data.data.sideImageOne);
      setSideImageTwo(res.data.data.sideImageTwo);
      setRating(res.data.data.reviewStars);
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

  const addProductToCart = async () => {
    const productId = id;
    const quantity = 1;
    try {
      const addToCartResponse = await axios.post("add-to-cart", {
        userId,
        productId,
        quantity,
      });

      if (addToCartResponse.data && addToCartResponse.data.success) {
        toast.success(addToCartResponse.data.message);
        navigate("/cart");
      }
      if (
        addToCartResponse.response &&
        addToCartResponse.response.data &&
        addToCartResponse.response.data.message
      ) {
        toast.error(addToCartResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const notAccessible = () => {
    toast.error("LOGIN FIRST!!");
  };

  useEffect(() => {
    FetchProduct(id);
  }, [id]);

  return (
    <>
      <Box
        sx={{
          p: 3,
          backgroundImage:
            "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779141/user-smoke_artunt.svg)",
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
        {isUser ? (
          <Box sx={{ position: "absolute", top: 10, right: 20 }}>
            <NavLink to={"/cart"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ShoppingCartIcon
                  style={{ color: "white", fontSize: "2.5rem" }}
                />
                <Typography
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                  fontSize={"1rem"}
                  fontWeight={"bold"}
                >
                  CART
                </Typography>
              </Box>
            </NavLink>
          </Box>
        ) : (
          ""
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 7,
            background: "white",
            p: 5,
            pl: 7,
            mt: 7,
            mb: 3,
            borderRadius: 2,
          }}
        >
          <Box>
            <Box sx={{ my: 2 }}>
              <Typography
                fontWeight={400}
                fontFamily={"Comme, sans-serif"}
                textAlign={"center"}
                mb={1}
              >
                scoll on Image to Zoom!
              </Typography>
              <TransformWrapper options={{ limitToBounds: false }}>
                <TransformComponent>
                  <img
                    src={mainImage}
                    alt="Zoomable Image"
                    style={{ width: "220px", height: "300px" }}
                  />
                </TransformComponent>
              </TransformWrapper>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{ my: 2, cursor: "pointer" }}
                onClick={() => handleImageToggle(sideImageOne)}
              >
                <img
                  src={sideImageOne}
                  style={{
                    width: "120px",
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
                    width: "120px",
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
            <Rating value={rating} size="large" readOnly />
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
            {isUser ? (
              <Box my={1}>
                <Button
                  sx={{
                    background: "black",
                    border: "none",
                    textTransform: "none",
                    outline: "none",
                    color: "white",
                    fontSize: "2vw",
                    transition: "0.1s ease-in-out color",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                  onClick={addProductToCart}
                >
                  <Typography
                    fontSize={"2vw"}
                    fontWeight={800}
                    fontFamily={"Comme, sans-serif"}
                    mx={1}
                  >
                    <i>Add to Cart</i>
                  </Typography>
                  <ShoppingCartIcon />
                </Button>
              </Box>
            ) : (
              <Box my={1}>
                <Button
                  sx={{
                    background: "black",
                    border: "none",
                    textTransform: "none",
                    outline: "none",
                    color: "white",
                    fontSize: "2vw",
                    transition: "0.1s ease-in-out color",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                  onClick={notAccessible}
                >
                  <Typography
                    fontSize={"2vw"}
                    fontWeight={800}
                    fontFamily={"Comme, sans-serif"}
                    mx={1}
                  >
                    <i>Add to Cart</i>
                  </Typography>
                  <ShoppingCartIcon />
                </Button>
              </Box>
            )}

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
              {product.info}
            </Typography>
          </Box>
        </Box>
        <RelevantProducts id={id} />
        <ProductComments id={id} />
      </Box>
      <Footer />
    </>
  );
};

export default ViewSingleProduct;
