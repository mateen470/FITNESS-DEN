import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const AdminProductView = () => {
  const [allProducts, setAllProducts] = useState([]);

  const FetchAllProducts = async () => {
    await axios
      .get("product/all-products")
      .then((res) => setAllProducts(res.data.data));
  };

  const handleDelete = async (id) => {
    try {
      const deleteProduct = await axios.delete(`product/delete-product/${id}`);
      if (deleteProduct.data && deleteProduct.data.success) {
        toast.success(deleteProduct.data.message);
      }
      if (
        deleteProduct.response &&
        deleteProduct.response.data &&
        deleteProduct.response.data.message
      ) {
        toast.error(deleteProduct.response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    FetchAllProducts();
  }, [allProducts]);

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
        All Products
      </Typography>
      <NavLink
        to={"/add-product"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          color={"white"}
          fontFamily={"Comme, sans-serif"}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.7vw",
            borderBottom: "1px solid white",
          }}
        >
          <AddCircleIcon sx={{ fontSize: "5vh" }} /> Add Product
        </Typography>
      </NavLink>
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
              Product Title
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
          {allProducts.map((item, index) => (
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
                {item.title}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "none",
                }}
              >
                <Box sx={{ mx: 1, cursor: "pointer" }}>
                  <NavLink to={`/view-product/${item._id}`}>
                    <VisibilityRoundedIcon
                      sx={{ color: "white", fontSize: "5vh" }}
                    />
                  </NavLink>
                </Box>
                <Box
                  sx={{ mx: 1, cursor: "pointer" }}
                  onClick={() => handleDelete(item._id)}
                >
                  <DeleteIcon sx={{ color: "white", fontSize: "5vh" }} />
                </Box>
                <Box sx={{ mx: 1, cursor: "pointer" }}>
                  <NavLink to={`/update-product/${item._id}`}>
                    <EditIcon sx={{ color: "white", fontSize: "5vh" }} />
                  </NavLink>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminProductView;
