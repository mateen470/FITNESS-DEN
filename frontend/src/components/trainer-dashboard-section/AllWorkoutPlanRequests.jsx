import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsNewWorkoutPlanRequests } from "../../context/CheckForNewPlanRequests";
import { AddWorkoutPlanDetails } from "../../context/WorkoutPlanDetails";
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

const AllWorkoutPlanRequests = () => {
  const dispatch = useDispatch();
  const [WorkoutPlanRequests, setWorkoutPlanRequests] = useState([]);
  const FetchWorkoutPlanRequests = () => {
    axios
      .get("workout/all-new-workout-requests")
      .then((res) => setWorkoutPlanRequests(res.data.data));
  };
  useEffect(() => {
    FetchWorkoutPlanRequests();
    dispatch(setIsNewWorkoutPlanRequests(false));
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
        All Workout Plan Requests
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
          {WorkoutPlanRequests.map((item, index) => (
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
                {item.title}
              </TableCell>
              <TableCell>
                <Button>
                  <NavLink
                    to="/view-workout-plan-details"
                    onClick={() => dispatch(AddWorkoutPlanDetails(item))}
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
export default AllWorkoutPlanRequests;
