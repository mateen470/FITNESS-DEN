import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FetchExcercise } from "../../context/Excercise";
import { useDispatch } from "react-redux";
import UpdateRequestModal from "../../components/update-req-modal/WorkoutUpdateRequestModal";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const ViewWorkoutPlanPage = () => {
  const dispatch = useDispatch();
  const [Plan, setPlan] = useState([]);
  const [index, setIndex] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePlan = async () => {
    await axios.get("workout/all-workout-plans").then((res) => {
      setPlan(res.data.data);
    });
  };
  useEffect(() => handlePlan, []);

  const handleClick = (Week, Day) => {
    Plan.map((i) => {
      return i.WorkoutPlan.map((x) =>
        x.map(
          (y) =>
            y.Week === Week &&
            y.Day === Day &&
            dispatch(FetchExcercise(y.Excercise))
        )
      );
    });
  };

  return (
    <Container>
      {modalOpen && (
        <UpdateRequestModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          Plan={Plan[index]}
        />
      )}

      {Plan.map((item, key) => (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Monday</TableCell>
                <TableCell>Tuesday</TableCell>
                <TableCell>Wednesday</TableCell>
                <TableCell>Thursday</TableCell>
                <TableCell>Friday</TableCell>
                <TableCell>Saturday</TableCell>
                <TableCell>Sunday</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item.WorkoutPlan.map((i, index) => (
                <TableRow>
                  <TableCell>Week{index + 1}</TableCell>
                  {i.map((x) => (
                    <>
                      <TableCell onClick={() => handleClick(x.Week, x.Day)}>
                        <Link to="/exercise">{x.BodyPart}</Link>
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={() => {
              setIndex(key);
              setModalOpen(true);
            }}
          >
            Update Plan
          </Button>
        </>
      ))}
    </Container>
  );
};

export default ViewWorkoutPlanPage;
