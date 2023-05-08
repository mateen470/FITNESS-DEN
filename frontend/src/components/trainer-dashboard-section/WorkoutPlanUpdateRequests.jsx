import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FetchWorkoutPlanToUpdate } from "../../context/UpdatePlan";
import {
  Box,
  Button,
  Container,
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
  useEffect(FetchRequests, []);

  const handleUpdate = async (e) => {
    const id = e.target.id;
    dispatch(FetchWorkoutPlanToUpdate(Requests[id]));
  };
  return (
    <Container>
      <Box className="singleRequestContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Requests.map((i, index) => (
              <>
                <TableRow>
                  <TableCell className="requestDescriotion">
                    {i.Description}
                  </TableCell>
                  <TableCell>
                    <Button id={index} onClick={handleUpdate}>
                      <Link id={index} onClick={handleUpdate} to="/updatePlan">
                        Update
                      </Link>
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
