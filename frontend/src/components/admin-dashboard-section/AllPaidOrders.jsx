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
      const response = await axios.get("payment/ecom-allPayments");
      setAllPaidProducts([...response.data.data]);
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
                textAlign: "center",
              }}
            >
              Order No.
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              Status
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
            return (
              <TableRow key={index} sx={{ borderBottom: "1px solid white" }}>
                <TableCell
                  sx={{
                    color: "white",
                    fontSize: "4.5vh",
                    fontFamily: "Comme, sans-serif",
                    borderBottom: "none",
                    textAlign: "center",
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
                  {item.status}
                </TableCell>

                <TableCell>
                  <NavLink to={`/paid-product-view/${item._id}`}>
                    <VisibilityRoundedIcon style={{ color: "white" }} />
                  </NavLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AllPaidOrders;
