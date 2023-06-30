import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { AddAllProductsInfoToBuy } from "../../../context/EcomPayment";

const AddToCart = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const removeProduct = async (id) => {
    try {
      const removeProduct = await axios.delete(`remove-from-cart/${id}`, {
        withCredentials: true,
      });
      if (removeProduct.data && removeProduct.data.success) {
        toast.success(removeProduct.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of product) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  };

  const increment = async (id) => {
    try {
      await axios.post(`increment/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const decrement = async (id, quantity) => {
    try {
      if (quantity === 1) {
        removeProduct(id);
      } else {
        await axios.post(`decrement/${id}`, {
          withCredentials: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const products = [];
      for (const cartItem of cartItems) {
        const response = await axios.get(
          `product/single-product/${cartItem.productId}`
        );
        const productData = {
          ...response.data.data,
          quantity: cartItem.quantity,
        };
        products.push(productData);
      }
      setProduct(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const getUserObject = await axios.post("get-cart-products", {
          withCredentials: true,
        });
        if (getUserObject.data && getUserObject.data.success) {
          setCartItems(() => {
            return [...getUserObject.data.data.cart];
          });
          fetchProduct();
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCartItems();
  }, [product]);

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
    <Box p={3}>
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
      <Typography
        color={"white"}
        variant={
          windowWidth < 810 && windowWidth > 768
            ? "h5"
            : windowWidth < 768 && windowWidth > 500
            ? "h3"
            : windowWidth < 500
            ? "h5"
            : "h3"
        }
        fontWeight={800}
        textAlign={"center"}
        mt={4}
        mb={2}
      >
        My ShoppingCart
      </Typography>

      <Box
        sx={{
          background: "white",
          borderRadius: 2,
          overflowX: "auto",
          p: 3,
          position: "relative",
        }}
      >
        {product.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255,255,255,0.3)",
                borderRadius: 2,
                width: "70vh",
                p: 5,
              }}
            >
              <img
                src={
                  "https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779071/emptyCart_ygei0a.svg"
                }
                style={{
                  width:
                    windowWidth < 1100 && windowHeight > 1000
                      ? "40vh"
                      : windowWidth < 1000
                      ? "30vh"
                      : "40vh",
                }}
              />
            </Box>
          </Box>
        ) : (
          <Table sx={{ mb: 5 }}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize:
                      windowWidth < 1100 && windowHeight > 1000
                        ? "5vh"
                        : windowWidth < 1000
                        ? "1rem"
                        : "5vh",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize:
                      windowWidth < 1100 && windowHeight > 1000
                        ? "5vh"
                        : windowWidth < 1000
                        ? "1rem"
                        : "5vh",
                  }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize:
                      windowWidth < 1100 && windowHeight > 1000
                        ? "5vh"
                        : windowWidth < 1000
                        ? "1rem"
                        : "5vh",
                    textAlign: "center",
                  }}
                >
                  Remove
                </TableCell>
                <TableCell
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize:
                      windowWidth < 1100 && windowHeight > 1000
                        ? "5vh"
                        : windowWidth < 1000
                        ? "1rem"
                        : "5vh",
                  }}
                >
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.mainImage}
                      alt="product"
                      style={{
                        height:
                          windowWidth < 1100 && windowHeight > 1000
                            ? "20vh"
                            : windowWidth < 1000
                            ? "4rem"
                            : "20vh",
                        weight:
                          windowWidth < 1100 && windowHeight > 1000
                            ? "20vh"
                            : windowWidth < 1000
                            ? "4rem"
                            : "20vh",
                        borderRadius: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontSize:
                        windowWidth < 1100 && windowHeight > 1000
                          ? "4vh"
                          : windowWidth < 1000
                          ? "0.8rem"
                          : "4vh",
                      fontWeight: "bold",
                      fontFamily: "Comme, sans-serif",
                    }}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <KeyboardArrowUpIcon
                          style={{ color: "black", cursor: "pointer" }}
                          onClick={() => increment(item._id)}
                        />
                        <KeyboardArrowDownIcon
                          style={{ color: "black", cursor: "pointer" }}
                          onClick={() => decrement(item._id, item.quantity)}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color: "black",
                          fontSize:
                            windowWidth < 1100 && windowHeight > 1000
                              ? "4vh"
                              : windowWidth < 1000
                              ? "0.8rem"
                              : "4vh",
                          fontWeight: "bold",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <DeleteIcon
                        style={{
                          fontSize:
                            windowWidth < 1100 && windowHeight > 1000
                              ? "7vh"
                              : windowWidth < 1000
                              ? "1.2rem"
                              : "7vh",
                          cursor: "pointer",
                          color: "black",
                        }}
                        onClick={() => removeProduct(item._id)}
                      />{" "}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "black",
                      fontSize:
                        windowWidth < 1100 && windowHeight > 1000
                          ? "4vh"
                          : windowWidth < 1000
                          ? "0.8rem"
                          : "4vh",
                      fontWeight: "bold",
                      fontFamily: "Comme, sans-serif",
                    }}
                  >
                    Rs.{item.price * item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Box sx={{ position: "absolute", right: 15, bottom: 60 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 1,
              width: "15rem",
              px: 2,
              mb: 2,
              marginRight: "auto",
            }}
          >
            <Box>
              <Typography
                fontFamily={"Comme, sans-serif"}
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "2.8vh"
                    : windowWidth < 1000 && windowHeight > 500
                    ? "3.5vh"
                    : windowHeight < 550
                    ? "5vh"
                    : "2vw"
                }
                fontWeight={400}
                color={"black"}
              >
                Total
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                fontSize={
                  windowWidth < 1100 && windowHeight > 1000
                    ? "2.8vh"
                    : windowWidth < 1000 && windowHeight > 500
                    ? "3.5vh"
                    : windowHeight < 550
                    ? "5vh"
                    : "2vw"
                }
                fontWeight={800}
                fontFamily={"Comme, sans-serif"}
                color={"black"}
              >
                Rs.
                <Typography
                  fontSize={
                    windowWidth < 1100 && windowHeight > 1000
                      ? "2.8vh"
                      : windowWidth < 1000 && windowHeight > 500
                      ? "3.5vh"
                      : windowHeight < 550
                      ? "5vh"
                      : "2vw"
                  }
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                  color={"black"}
                >
                  {calculateTotalPrice()}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
        {product.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 10,
            }}
          >
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
            >
              <NavLink
                onClick={() => toast.error("NO PRODUCT IN CART!!")}
                to="/cart"
              >
                <Typography
                  fontSize={
                    windowWidth < 1100 && windowHeight > 1000
                      ? "2vh"
                      : windowWidth < 1000
                      ? "1rem"
                      : "1.7vw"
                  }
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                  mx={1}
                >
                  CheckOut
                </Typography>
              </NavLink>
              <ShoppingCartCheckoutIcon />
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 10,
            }}
          >
            <Button
              onClick={() =>
                dispatch(
                  AddAllProductsInfoToBuy({
                    TotalPayment: calculateTotalPrice(),
                    AllProducts: product,
                  })
                )
              }
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
            >
              <NavLink
                onClick={() =>
                  dispatch(
                    AddAllProductsInfoToBuy({
                      TotalPayment: calculateTotalPrice(),
                      AllProducts: product,
                    })
                  )
                }
                to="/checkout"
              >
                <Typography
                  fontSize={
                    windowWidth < 1100 && windowHeight > 1000
                      ? "2vh"
                      : windowWidth < 1000
                      ? "1rem"
                      : "1.7vw"
                  }
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                  mx={1}
                >
                  CheckOut
                </Typography>
              </NavLink>
              <ShoppingCartCheckoutIcon />
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddToCart;
