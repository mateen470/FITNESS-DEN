import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsNewWorkoutPlanUpdateRequests } from "../../context/CheckForNewPlanRequests";
import { FetchWorkoutPlanToUpdate } from "../../context/UpdatePlan";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const WorkoutPlanUpdateRequests = () => {
  const dispatch = useDispatch();
  const [Requests, setRequest] = useState([]);

  const FetchRequests = () => {
    axios
      .get("workout/all-workout-update-request")
      .then((res) => setRequest(res.data.data));
  };
  useEffect(() => {
    FetchRequests();
    dispatch(setIsNewWorkoutPlanUpdateRequests(false));
  }, []);

  const handleUpdate = async (e) => {
    const id = e.target.id;
    dispatch(FetchWorkoutPlanToUpdate(Requests[id]));
  };
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
        All Workout Plan Update Requests
      </Typography>
      <Box className="singleRequestContainer">
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
                Description
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
            {Requests.map((i, index) => (
              <>
                <TableRow>
                  <TableCell
                    className="requestDescriotion"
                    sx={{
                      color: "white",
                      fontSize: "5vh",
                      fontFamily: "Comme, sans-serif",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className="requestDescriotion"
                    sx={{
                      color: "white",
                      fontSize: "5vh",
                      fontFamily: "Comme, sans-serif",
                    }}
                  >
                    {i.Description}
                  </TableCell>
                  <TableCell>
                    <Button id={index} onClick={handleUpdate}>
                      <NavLink
                        id={index}
                        onClick={handleUpdate}
                        to="/update-workout-plan"
                      >
                        <VisibilityRoundedIcon
                          id={index}
                          sx={{ color: "white", fontSize: "6vh" }}
                        />
                      </NavLink>
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default WorkoutPlanUpdateRequests;
