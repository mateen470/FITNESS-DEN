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
import { NavLink } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCart = () => {
  const userId = useSelector((state) => state.CurrentUser.CurrentUserID);
  const fakeData = [{ Title: "dummy1" }, { Title: "dummy2" }];
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      const getCartItemsResponse = await axios.get("get-cart-products", {
        userId,
      });
      if (getCartItemsResponse.data && getCartItemsResponse.data.success) {
        toast.success(getCartItemsResponse.data.message);
        setCartItems(getCartItemsResponse.data.data);
        console.log(getCartItemsResponse.data.data);
      }
      if (
        getCartItemsResponse.response &&
        getCartItemsResponse.response.data &&
        getCartItemsResponse.response.data.message
      ) {
        toast.error(getCartItemsResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [cartItems]);

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
          background: "white",
          borderRadius: 2,
          p: 3,
          position: "relative",
        }}
      >
        <Table sx={{ mb: 5 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "5vh",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "5vh",
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "5vh",
                }}
              >
                Remove
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "5vh",
                }}
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fakeData.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    color: "black",
                    fontSize: "3.7vh",
                    fontFamily: "Comme, sans-serif",
                  }}
                >
                  Image
                </TableCell>
                <TableCell
                  sx={{
                    color: "black",
                    fontSize: "3.7vh",
                    fontFamily: "Comme, sans-serif",
                  }}
                >
                  {item.Title}
                </TableCell>
                <TableCell
                  sx={{
                    color: "black",
                    fontSize: "3.7vh",
                    fontFamily: "Comme, sans-serif",
                  }}
                >
                  {item.Title}
                </TableCell>
                <TableCell
                  sx={{
                    color: "black",
                    fontSize: "3.7vh",
                    fontFamily: "Comme, sans-serif",
                  }}
                >
                  {item.Title}
                </TableCell>
                <TableCell
                  sx={{
                    color: "black",
                    fontSize: "3.7vh",
                    fontFamily: "Comme, sans-serif",
                  }}
                >
                  {item.Title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ position: "absolute", right: 15, bottom: 60 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid black",
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
              >
                Rs.{" "}
                <Typography
                  fontSize={"2vw"}
                  fontWeight={800}
                  fontFamily={"Comme, sans-serif"}
                >
                  1000
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
            <Typography
              fontSize={"1.7vw"}
              fontWeight={800}
              fontFamily={"Comme, sans-serif"}
              mx={1}
            >
              CheckOut
            </Typography>
            <ShoppingCartCheckoutIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddToCart;
