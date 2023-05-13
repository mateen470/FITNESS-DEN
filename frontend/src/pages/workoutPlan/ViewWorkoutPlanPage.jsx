import React, { useEffect, useState } from "react";
import axios from "axios";
import { FetchExcercise } from "../../context/Excercise";
import { useDispatch, useSelector } from "react-redux";
import UpdateRequestModal from "../../components/update-req-modal/WorkoutUpdateRequestModal";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { NavLink } from "react-router-dom";
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
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Monday
          </TableCell>
        );
      case 2:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Tuesday
          </TableCell>
        );
      case 3:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Wednesday
          </TableCell>
        );
      case 4:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Thursday
          </TableCell>
        );
      case 5:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Friday
          </TableCell>
        );
      case 6:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Saturday
          </TableCell>
        );
      case 7:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Sunday
          </TableCell>
        );
      default:
        return <TableCell></TableCell>;
    }
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ position: "absolute", top: 0, left: 5 }}>
        <NavLink to={"/user"}>
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
        fontSize={"5vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        my={4}
      >
        Your Workout Plan!
      </Typography>
      {modalOpen && (
        <UpdateRequestModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          Plan={ResponseFromDB}
        />
      )}
      {Plan.map((i, index) => (
        <>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontWeight={800}
            fontSize={"5vh"}
          >
            Week{index + 1}
          </Typography>
          <Table>
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
                  Day
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "5vh",
                    fontFamily: "Comme, sans-serif",
                  }}
                >
                  Exercise
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {i.map((x) => (
                <TableRow>
                  {handleDay(x.Day)}
                  <TableCell onClick={() => handleClick(x.Week, x.Day)}>
                    <NavLink to="/exercise">
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "3.5vh",
                          fontFamily: "Comme, sans-serif",
                          borderBottom: "0.5px solid white",
                          display: "inline-block",
                        }}
                      >
                        {x.BodyPart}
                      </Typography>
                    </NavLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ))}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 10,
          mt: 4,
        }}
      >
        <button
          onClick={() => {
            setModalOpen(true);
          }}
          style={{
            background: "white",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
          }}
        >
          <Typography
            fontSize={"3.5vh"}
            color={"black"}
            fontWeight={800}
            textAlign={"center"}
            px={2}
            py={1}
          >
            Update Plan
          </Typography>
        </button>
      </Box>
    </Container>
  );
};

export default ViewWorkoutPlanPage;
