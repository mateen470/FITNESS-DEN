import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const AllPaidOrders = () => {
  const [allPaidProducts, setAllPaidProducts] = useState([]);
  const [shippingDataArray, setShippingDataArray] = useState([]);

  useEffect(() => {
    const fetchPaidProductsForAdmin = async () => {
      const response = await axios.get("payment/ecom-allPayments");
      setAllPaidProducts([...response.data.data]);
      console.log(response.data.data);
      const shippingData = response.data.data.map((item) => item.CheckoutData);
      setShippingDataArray(shippingData);
    };
    fetchPaidProductsForAdmin();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        fontSize={"4.5vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        mt={4}
        mb={2}
      >
        All Orders
      </Typography>
      <Table sx={{ mb: 10, mt: 4, minWidth: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              Item
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              Quantity
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              Paid Price
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allPaidProducts.map((item, index) => {
            const allProducts = item.AllProductsBoughtInfo[0]?.AllProducts;
            return allProducts.map((product, productIndex) => {
              const mainImage = product.mainImage;
              const title = product.title;
              const quantity = product.quantity;
              const totalPayment = product.price;
              const productShippingData = shippingDataArray[productIndex];

              return (
                <TableRow
                  key={`${index}-${productIndex}`}
                  sx={{ borderBottom: "1px solid white" }}
                >
                  <TableCell>
                    <img
                      src={mainImage}
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
                      fontSize: "4.5vh",
                      fontFamily: "Comme, sans-serif",
                      borderBottom: "none",
                    }}
                  >
                    {title}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "4.5vh",
                      fontFamily: "Comme, sans-serif",
                      borderBottom: "none",
                    }}
                  >
                    {quantity}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "4.5vh",
                      fontFamily: "Comme, sans-serif",
                      borderBottom: "none",
                    }}
                  >
                    Rs.{quantity * totalPayment}
                  </TableCell>
                  <TableCell>
                    <NavLink to={"/paid-product-view"}>
                      <VisibilityRoundedIcon style={{ color: "white" }} />
                    </NavLink>
                  </TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AllPaidOrders;
