import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FetchExcercise } from "../../context/Excercise";
import { useDispatch, useSelector } from "react-redux";
import UpdateRequestModal from "../../components/update-req-modal/WorkoutUpdateRequestModal";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ViewWorkoutPlanPage = () => {
  const dispatch = useDispatch();
  const [Plan, setPlan] = useState([]);
  const [ResponseFromDB, setResponseFromDB] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );
  const handlePlan = async () => {
    await axios
      .get("workout/all-workout-plans/" + IDofCurrentUser)
      .then((res) => {
        setPlan(res.data.data.WorkoutPlan);
        setResponseFromDB(res.data.data);
      });
  };
  console.log(Plan);
  useEffect(() => handlePlan, []);

  const handleClick = (Week, Day) => {
    Plan.map((item) =>
      item.map(
        (y) =>
          y.Week === Week &&
          y.Day === Day &&
          dispatch(FetchExcercise(y.Excercise))
      )
    );
  };
  const handleDay = (index) => {
    switch (index) {
      case 1:
        return <TableCell>Monday</TableCell>;
      case 2:
        return <TableCell>Tuesday</TableCell>;
      case 3:
        return <TableCell>Wednesday</TableCell>;
      case 4:
        return <TableCell>Thursday</TableCell>;
      case 5:
        return <TableCell>Friday</TableCell>;
      case 6:
        return <TableCell>Saturday</TableCell>;
      case 7:
        return <TableCell>Sunday</TableCell>;
      default:
        return <TableCell></TableCell>;
    }
  };
  return (
    <Container>
      {modalOpen && (
        <UpdateRequestModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          Plan={ResponseFromDB}
        />
      )}
      {Plan.map((i, index) => (
        <>
          <Typography>Week{index + 1}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Game</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {i.map((x) => (
                <TableRow>
                  {handleDay(x.Day)}
                  <TableCell onClick={() => handleClick(x.Week, x.Day)}>
                    <Link to="/exercise">{x.BodyPart}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ))}

      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Update Plan
      </Button>
    </Container>
  );
};

export default ViewWorkoutPlanPage;
