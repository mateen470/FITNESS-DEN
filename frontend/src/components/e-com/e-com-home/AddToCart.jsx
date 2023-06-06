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

  return (
    <Box p={3}>
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
      <Typography
        color={"white"}
        fontSize={"4.5vw"}
        fontWeight={800}
        textAlign={"center"}
        mt={4}
        mb={2}
      >
        My ShoppingCart
      </Typography>

      <Box
        sx={{
          backgroundImage:
            "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779108/workoutbg_ifypzl.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: 2,
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
                style={{ width: "60vh" }}
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
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "5vh",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "5vh",
                  }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "5vh",
                    textAlign: "center",
                  }}
                >
                  Remove
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "5vh",
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
                        height: "20vh",
                        weight: "20vh",
                        borderRadius: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "4vh",
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
                          style={{ color: "white", cursor: "pointer" }}
                          onClick={() => increment(item._id)}
                        />
                        <KeyboardArrowDownIcon
                          style={{ color: "white", cursor: "pointer" }}
                          onClick={() => decrement(item._id, item.quantity)}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "4vh",
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
                          fontSize: "7vh",
                          cursor: "pointer",
                          color: "white",
                        }}
                        onClick={() => removeProduct(item._id)}
                      />{" "}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "4vh",
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
                fontSize={"2vw"}
                fontWeight={400}
                color={"white"}
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
                fontSize={"2vw"}
                fontWeight={800}
                fontFamily={"Comme, sans-serif"}
                color={"white"}
              >
                Rs.{" "}
                <Typography
                  fontSize={"2vw"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                  color={"white"}
                >
                  {calculateTotalPrice()}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
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
                fontSize={"1.7vw"}
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
      </Box>
    </Box>
  );
};

export default AddToCart;
