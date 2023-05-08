import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddDietPlanDetails } from "../../context/DietPlanDetails";
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const AllDietPlanRequests = () => {
  const dispatch = useDispatch();
  const [DietPlanRequests, setDietPlanRequests] = useState([]);
  const FetchDietPlanRequests = () => {
    axios
      .get("diet/")
      .then((res) => setDietPlanRequests(res.data));
  };
  useEffect(FetchDietPlanRequests, []);

  return (
    <Container>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "black",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "800",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "800",
                }}
              >
                Plan Title
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "800",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DietPlanRequests.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {item._id}
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {item.Title}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button variant="contained">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/viewDietPlanDetails"
                      onClick={() => dispatch(AddDietPlanDetails(item))}
                    >
                      View Detail
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};
export default AllDietPlanRequests;
