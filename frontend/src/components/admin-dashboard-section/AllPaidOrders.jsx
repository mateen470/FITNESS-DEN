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

  useEffect(() => {
    const fetchPaidProductsForAdmin = async () => {
      const allPaidProducts = await axios.get("payment/ecom-allPayments");
      console.log(allPaidProducts.data.data);
      setAllPaidProducts([...allPaidProducts.data.data]);
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
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              ID
            </TableCell>
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
          {allPaidProducts.map((item, index) => (
            <TableRow key={index} sx={{ borderBottom: "1px solid white" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "4vh",
                  fontFamily: "Comme, sans-serif",
                  borderBottom: "none",
                }}
              >
                {index + 1}
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "4.5vh",
                  fontFamily: "Comme, sans-serif",
                  borderBottom: "none",
                }}
              >
                ok
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "4.5vh",
                  fontFamily: "Comme, sans-serif",
                  borderBottom: "none",
                }}
              >
                ok
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "4.5vh",
                  fontFamily: "Comme, sans-serif",
                  borderBottom: "none",
                }}
              >
                ok
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "none",
                }}
              >
                <NavLink to={`/paid-product-view/${index}`}>
                  <VisibilityRoundedIcon style={{ color: "white" }} />
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AllPaidOrders;
