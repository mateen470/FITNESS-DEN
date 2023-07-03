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
import Slider from "react-slick";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "none", right: "-35px" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "none", left: "-35px" }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 10000,
  cssEase: "linear",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const ViewSingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [sideImageOne, setSideImageOne] = useState("");
  const [sideImageTwo, setSideImageTwo] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                fontSize:
                  windowWidth < 1100 && windowHeight > 1000
                    ? "2vh"
                    : windowWidth < 1000
                    ? "1.2rem"
                    : "1.7vw",
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
        {windowWidth < 768 ? (
          <Box
            sx={{
              background: "white",
              px: 2,
              pt: 1,
              pb: 5,
              mt: 7,
              mb: 3,
              borderRadius: 1,
            }}
          >
            <Box sx={{ height: "60vh", overflow: "visible" }}>
              <Slider {...settings}>
                <Box sx={{ display: "flex" }}>
                  <img
                    alt="product"
                    src={mainImage}
                    style={{
                      display: "inline-block",
                      padding: "auto",
                      height: "60vh",
                      width: "100%",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <img
                    alt="product"
                    src={sideImageOne}
                    style={{
                      display: "inline-block",
                      padding: "auto",
                      height: "60vh",
                      width: "100%",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <img
                    alt="product"
                    src={sideImageTwo}
                    style={{
                      display: "inline-block",
                      padding: "auto",
                      height: "60vh",
                      width: "100%",
                    }}
                  />
                </Box>
              </Slider>
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
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "3.4vh"
                    : windowWidth < 1000 && windowWidth > 500
                    ? "4vh"
                    : windowWidth < 500
                    ? "4.2vh"
                    : "3.2vw"
                }
                color={"black"}
                fontWeight={800}
                mt={1}
              >
                {product.title}
              </Typography>
              <Rating value={rating} size="small" readOnly />
              <hr style={{ marginTop: "1rem" }} />
              <Typography
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "3vh"
                    : windowWidth < 1000
                    ? "3.5vh"
                    : "2.5vw"
                }
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
                      transition: "0.1s ease-in-out color",
                      "&:hover": {
                        color: "black",
                      },
                    }}
                    onClick={addProductToCart}
                  >
                    <Typography
                      fontSize={
                        windowWidth < 1100 && windowHeight > 1000
                          ? "2.6vh"
                          : windowWidth < 1000
                          ? "3vh"
                          : "1.9vw"
                      }
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
                      transition: "0.1s ease-in-out color",
                      "&:hover": {
                        color: "black",
                      },
                    }}
                    onClick={notAccessible}
                  >
                    <Typography
                      fontSize={
                        windowWidth < 1100 && windowHeight > 1000
                          ? "2.6vh"
                          : windowWidth < 1000
                          ? "3vh"
                          : "1.9vw"
                      }
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
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "3vh"
                    : windowWidth < 1000 && windowWidth > 500
                    ? "3vh"
                    : windowWidth < 500
                    ? "3.2vh"
                    : "2.5vw"
                }
                color={"black"}
                fontWeight={800}
                fontFamily={"Comme, sans-serif"}
                my={1}
              >
                {product.metaDescription}
              </Typography>

              <Typography
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "2.2vh"
                    : windowWidth < 1000 && windowWidth > 500
                    ? "2.5vh"
                    : windowWidth < 500
                    ? "2.6vh"
                    : "1.9vw"
                }
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
        ) : (
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
                      style={{
                        width: "220px",
                        height: "300px",
                      }}
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
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "3.4vh"
                    : windowWidth < 1000
                    ? "8vh"
                    : "3.2vw"
                }
                color={"black"}
                fontWeight={800}
                mt={1}
              >
                {product.title}
              </Typography>
              <Rating value={rating} size="small" readOnly />
              <hr style={{ marginTop: "1rem" }} />
              <Typography
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "3vh"
                    : windowWidth < 1000
                    ? "6vh"
                    : "2.5vw"
                }
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
                      transition: "0.1s ease-in-out color",
                      "&:hover": {
                        color: "black",
                      },
                    }}
                    onClick={addProductToCart}
                  >
                    <Typography
                      fontSize={
                        windowWidth < 1100 && windowHeight > 1000
                          ? "2.6vh"
                          : windowWidth < 1000
                          ? "5vh"
                          : "1.9vw"
                      }
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
                      transition: "0.1s ease-in-out color",
                      "&:hover": {
                        color: "black",
                      },
                    }}
                    onClick={notAccessible}
                  >
                    <Typography
                      fontSize={
                        windowWidth < 1100 && windowHeight > 1000
                          ? "2.6vh"
                          : windowWidth < 1000
                          ? "5vh"
                          : "1.9vw"
                      }
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
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "3vh"
                    : windowWidth < 1000
                    ? "6vh"
                    : "2.5vw"
                }
                color={"black"}
                fontWeight={800}
                fontFamily={"Comme, sans-serif"}
                my={1}
              >
                {product.metaDescription}
              </Typography>

              <Typography
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "2.2vh"
                    : windowWidth < 1000
                    ? "5vh"
                    : "1.9vw"
                }
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
        )}

        <RelevantProducts id={id} />
        <ProductComments id={id} />
      </Box>
      <Footer />
    </>
  );
};

export default ViewSingleProduct;
