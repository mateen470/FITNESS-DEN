import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FetchExcercise } from "../../context/Excercise";
import { useDispatch } from "react-redux";
import UpdateRequestModal from "../../components/update-req-modal/WorkoutUpdateRequestModal";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import {
  Box,
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
    <Box px={2}>
      {modalOpen && (
        <UpdateRequestModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          Plan={Plan[index]}
        />
      )}
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
        fontSize={"6vw"}
        color={"white"}
        fontWeight={800}
        textAlign={"center"}
        mb={4}
      >
        Your WorkoutPlan!
      </Typography>
      {Plan.map((item, key) => (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "4vh",
                    fontFamily: "Comme, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Monday
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "4vh",
                    fontFamily: "Comme, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Tuesday
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "4vh",
                    fontFamily: "Comme, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Wednesday
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "4vh",
                    fontFamily: "Comme, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Thursday
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "4vh",
                    fontFamily: "Comme, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Friday
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "4vh",
                    fontFamily: "Comme, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Saturday
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "4vh",
                    fontFamily: "Comme, sans-serif",
                    textAlign: "center",
                  }}
                >
                  Sunday
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item.WorkoutPlan.map((i, index) => (
                <TableRow>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "4vh",
                      fontWeight: "bold",
                      fontFamily: "Comme, sans-serif",
                    }}
                    key={index}
                  >
                    Week{index + 1}
                  </TableCell>
                  {i.map((x) => (
                    <>
                      <TableCell onClick={() => handleClick(x.Week, x.Day)}>
                        <NavLink to="/exercise">
                          <Typography
                            sx={{
                              color: "white",
                              fontSize: "1.3rem",
                              fontFamily: "Comme, sans-serif",
                              borderBottom: "0.5px solid white",
                              textAlign: "center",
                            }}
                          >
                            {x.BodyPart}
                          </Typography>
                        </NavLink>
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
              mb: 5,
            }}
          >
            <button
              style={{
                background: "white",
                marginTop: "5px",
                border: "none",
                textAlign: "center",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                setIndex(key);
                setModalOpen(true);
              }}
            >
              <Typography
                     sx={{
                      color: "black",
                      fontSize: "1.3rem",
                      fontFamily: "Comme, sans-serif",
                      fontWeight: "bold",
                      px: 2,
                      py: 1,
           
                    }}
              >
                Update Plan
              </Typography>
            </button>
          </Box>
        </>
      ))}
    </Box>
  );
};

export default ViewWorkoutPlanPage;
