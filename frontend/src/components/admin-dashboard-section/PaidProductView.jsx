import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const PaidProductView = () => {
  const [singlePaidProducts, setSinglePaidProducts] = useState([]);
  const [checkoutData, setCheckOutData] = useState();
  const [deliveryStatus, setDeliveryStatus] = useState();

  const prd_Id = useParams();

  const fetchPaidProductsForAdmin = async () => {
    const response = await axios.get(
      `payment/ecom-single-porduct/${prd_Id.id}`
    );
    setCheckOutData(response.data.data.CheckoutData);
    setDeliveryStatus(response.data.data.status);
    setSinglePaidProducts([response.data.data]);
  };

  const handleChange = (event) => {
    setDeliveryStatus(event.target.checked ? "Delivered" : "in Process");
  };

  const changeStaus = async () => {
    const response = await axios.put(
      `payment/ecom-change-status/${prd_Id.id}`,
      {
        deliveryStatus,
      }
    );
    if (response.status === 200) {
      fetchPaidProductsForAdmin();
    }
  };

  useEffect(() => {
    fetchPaidProductsForAdmin();
  }, []);

  useEffect(() => {
    if (deliveryStatus) {
      changeStaus();
    }
  }, [deliveryStatus]);

  return (
    <Container>
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
      <Table sx={{ mb: 3, mt: 4, minWidth: "100%" }}>
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
                textAlign: "center",
              }}
            >
              Delivered?
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {singlePaidProducts.map((item, index) => {
            const allProducts = item.AllProductsBoughtInfo[0]?.AllProducts;

            return allProducts.map((product, productIndex) => {
              const mainImage = product.mainImage;
              const title = product.title;
              const quantity = product.quantity;
              const totalPayment = product.price;

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
                  <TableCell sx={{ textAlign: "center" }}>
                    <Switch
                      checked={deliveryStatus === "Delivered"}
                      onChange={handleChange}
                    />
                    <Typography color={"white"}> {deliveryStatus}</Typography>
                  </TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mb: 10,
        }}
      >
        <Typography
          fontSize={"3vw"}
          color={"white"}
          fontWeight={800}
          textAlign={"center"}
          mt={4}
          mb={2}
        >
          User Information
        </Typography>
        {checkoutData?.City ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 2,
              width: "100vh",
              py: 10,
              px: 1,
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "4.5vh",
                fontFamily: "Comme, sans-serif",
                borderBottom: "none",
              }}
            >
              Name: {checkoutData?.FullName}
            </Typography>

            <Typography
              sx={{
                color: "white",
                fontSize: "4.5vh",
                fontFamily: "Comme, sans-serif",
                borderBottom: "none",
              }}
            >
              Email: {checkoutData?.Email}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: "4.5vh",
                fontFamily: "Comme, sans-serif",
                borderBottom: "none",
              }}
            >
              Phone Number: {checkoutData?.PhoneNumber}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: "4.5vh",
                fontFamily: "Comme, sans-serif",
                borderBottom: "none",
              }}
            >
              Country: {checkoutData?.Country}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: "4.5vh",
                fontFamily: "Comme, sans-serif",
                borderBottom: "none",
              }}
            >
              City: {checkoutData?.City}
            </Typography>

            <Typography
              sx={{
                color: "white",
                fontSize: "4.5vh",
                fontFamily: "Comme, sans-serif",
                borderBottom: "none",
              }}
            >
              Address: {checkoutData?.Address}
            </Typography>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
};

export default PaidProductView;
