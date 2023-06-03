import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import axios from "axios";

const PaidOrders = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPaidProducts = async () => {
      const paidProducts = await axios.get("payment/get-user-paid-products", {
        withCredentials: true,
      });
      console.log(paidProducts.data.data);
      setProducts([...paidProducts.data.data]);
    };
    fetchPaidProducts();
  }, []);

  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://res.cloudinary.com/diwvqpuuf/image/upload/v1685779141/user-smoke_artunt.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/user"}>
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
      {products.length === 0 ? (
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
              alt="emptycart"
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
                }}
              >
                Paid-Price
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "5vh",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item) => {
              const allProducts = item.AllProductsBoughtInfo[0]?.AllProducts;
              const status = item.status;

              return allProducts.map((product, productIndex) => {
                const mainImage = product.mainImage;
                const title = product.title;
                const quantity = product.quantity;
                const totalPayment = product.price;

                return (
                  <TableRow key={productIndex}>
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {mainImage && (
                        <img
                          src={mainImage}
                          alt="product"
                          style={{
                            height: "20vh",
                            weight: "20vh",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: "4vh",
                        fontWeight: "bold",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      {title}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: "4vh",
                        fontWeight: "bold",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      {quantity}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: "4vh",
                        fontWeight: "bold",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      Rs.{totalPayment * quantity}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: "4vh",
                        fontWeight: "bold",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      {status}
                    </TableCell>
                  </TableRow>
                );
              });
            })}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default PaidOrders;
