import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsNewDietPlanRequests } from "../../context/CheckForNewPlanRequests";
import { AddDietPlanDetails } from "../../context/DietPlanDetails";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const AllDietPlanRequests = () => {
  const dispatch = useDispatch();
  const [DietPlanRequests, setDietPlanRequests] = useState([]);
  const FetchDietPlanRequests = () => {
    axios
      .get("diet/all-new-diet-requests")
      .then((res) => setDietPlanRequests(res.data.data));
  };
  useEffect(() => {
    FetchDietPlanRequests();
    dispatch(setIsNewDietPlanRequests(false));
  }, []);

  return (
    <Container>
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/trainer"}>
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
        fontSize={"4.5vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        my={4}
      >
        All Diet Plan Requests
      </Typography>
      <Table sx={{ mb: 10 }}>
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
              Plan Title
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
          {DietPlanRequests.map((item, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "5vh",
                  fontFamily: "Comme, sans-serif",
                }}
              >
                {index + 1}
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "5vh",
                  fontFamily: "Comme, sans-serif",
                }}
              >
                {item.Title}
              </TableCell>
              <TableCell>
                <Button>
                  <NavLink
                    to="/view-diet-plan-details"
                    onClick={() => dispatch(AddDietPlanDetails(item))}
                  >
                    <VisibilityRoundedIcon
                      sx={{ color: "white", fontSize: "5vh" }}
                    />
                  </NavLink>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
export default AllDietPlanRequests;
