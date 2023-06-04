import React, { useEffect, useState } from "react";
import axios from "axios";
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

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await axios.get("all-users");
      setUsers(allUsers.data.data);
    };
    getAllUsers();
  }, [users]);

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
        All Users
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
          my: 2,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "4vh",
            fontFamily: "Comme, sans-serif",
            textAlign: "center",
          }}
        >
          Total Users
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "4vh",
            fontFamily: "Comme, sans-serif",
            textAlign: "center",
          }}
        >
          {users.length}
        </Typography>
      </Box>

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
              Id
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "5vh",
                fontFamily: "Comme, sans-serif",
              }}
            >
              Email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item, index) => {
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
                  {item.name}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontSize: "4.5vh",
                    fontFamily: "Comme, sans-serif",
                    borderBottom: "none",
                  }}
                >
                  {item.email}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AllUsers;
