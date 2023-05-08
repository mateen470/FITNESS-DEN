import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddWorkoutPlanDetails } from "../../context/WorkoutPlanDetails";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const AllWorkoutPlanRequests = () => {
  const dispatch = useDispatch();
  const [WorkoutPlanRequests, setWorkoutPlanRequests] = useState([]);
  const FetchWorkoutPlanRequests = () => {
    axios
      .get("workout/all-new-workout-requests")
      .then((res) => setWorkoutPlanRequests(res.data.data));
  };
  useEffect(FetchWorkoutPlanRequests, []);

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Plan Title</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {WorkoutPlanRequests.map((item, index) => (
            <TableRow>
              <TableCell>{item._id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Button>
                  <Link
                    to="/viewWorkoutPlanDetails"
                    onClick={() => dispatch(AddWorkoutPlanDetails(item))}
                  >
                    View Detail
                  </Link>
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
