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
  const [planExist, setplanExist] = useState(false);
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
  useEffect(() => handlePlan, []);
  useEffect(() => {
    Plan.length === 0 ? setplanExist(false) : setplanExist(true);
    console.log(ResponseFromDB)
  }, [Plan, planExist]);
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
        display={planExist ? "block" : "none"}
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
      {planExist ? (
        <>
          <Typography
            color={"white"}
            fontFamily={"Comme, sans-serif"}
            fontWeight={800}
            fontSize={"6vh"}
            textAlign={"center"}
            my={3}
          >
            {ResponseFromDB.PlanName}
          </Typography>
          {Plan.map((i, index) => (
            <>
              <Typography
                color={"white"}
                fontFamily={"Comme, sans-serif"}
                fontWeight={800}
                fontSize={"5vh"}
                mt={3}
              >
                Week{index + 1}
              </Typography>
              <Table sx={{ mb: 5 }}>
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
        </>
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "50vh",
          }}
        >
          <Typography fontSize={"3.5vw"} color={"white"} textAlign={"center"}>
            You have not bought any Workout Plan!
          </Typography>
          <Typography
            fontSize={"3vw"}
            color={"white"}
            textAlign={"center"}
            fontFamily={"Comme, sans-serif"}
          >
            visit
            <NavLink
              to={"/workout-plans"}
              style={{
                borderBottom: "1px solid white",
                marginLeft: "3px",
                marginRight: "3px",
              }}
            >
              Get Workout Plan
            </NavLink>
            to get user-centeric Workout plan created by a professional
          </Typography>
        </Container>
      )}
      <Box
        sx={{
          display: planExist ? "flex" : "none",
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
