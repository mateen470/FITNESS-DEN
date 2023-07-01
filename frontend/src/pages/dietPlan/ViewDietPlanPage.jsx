import axios from "axios";
import React, { useEffect, useState } from "react";
import DietPlanUpdateRequestModal from "../../components/update-req-modal/DietPlanUpdateRequestModal";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { NavLink } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

const ViewDietPlanPage = () => {
  const [DietPlan, setDietPlan] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [planExist, setplanExist] = useState(false);
  const [indx, setindx] = useState(-1);
  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );
  const FetchDietPlan = () => {
    axios.get("diet/all-diet-plans/" + IDofCurrentUser).then((res) => {
      setDietPlan(res.data.data);
    });
  };
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => FetchDietPlan(), []);
  useEffect(() => {
    DietPlan.length === 0 ? setplanExist(false) : setplanExist(true);
  }, [DietPlan, planExist]);
  const handleDay = (index) => {
    switch (index) {
      case 0:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: windowWidth < 786 ? "3vh" : "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Monday
          </TableCell>
        );
      case 1:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: windowWidth < 786 ? "3vh" : "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Tuesday
          </TableCell>
        );
      case 2:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: windowWidth < 786 ? "3vh" : "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Wednesday
          </TableCell>
        );
      case 3:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: windowWidth < 786 ? "3vh" : "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Thursday
          </TableCell>
        );
      case 4:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: windowWidth < 786 ? "3vh" : "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Friday
          </TableCell>
        );
      case 5:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: windowWidth < 786 ? "3vh" : "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Saturday
          </TableCell>
        );
      case 6:
        return (
          <TableCell
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: windowWidth < 786 ? "3vh" : "5vh",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Sunday
          </TableCell>
        );
      default:
        return <TableCell></TableCell>;
    }
    console.log(DietPlan);
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
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize:
                windowWidth < 1100 && windowHeight > 1000
                  ? "2vh"
                  : windowWidth < 1000
                  ? "1.2rem"
                  : "1.7vw",
            }}
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
        Your Diet Plan!
      </Typography>
      {modalOpen && (
        <DietPlanUpdateRequestModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          Plan={DietPlan[indx]}
        />
      )}
      {planExist ? (
        DietPlan.map((Plan, index1) => (
          <>
            <Typography
              color={"white"}
              fontFamily={"Comme, sans-serif"}
              fontWeight={800}
              fontSize={"6vh"}
              textAlign={"center"}
              my={3}
            >
              {Plan.PlanName}
            </Typography>
            {Plan.DietPlan.map((item, index) => (
              <>
                <Typography
                  color={"white"}
                  fontFamily={"Comme, sans-serif"}
                  fontWeight={800}
                  fontSize={"5vh"}
                  mt={3}
                >
                  Week {index + 1}
                </Typography>
                <Box
                  sx={{ overflowX: "scroll", display: "block", width: "100%" }}
                >
                  <Table sx={{ mb: 5 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: windowWidth < 786 ? "4vh" : "5vh",
                            fontFamily: "Comme, sans-serif",
                          }}
                        >
                          Breakfast
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: windowWidth < 786 ? "4vh" : "5vh",
                            fontFamily: "Comme, sans-serif",
                          }}
                        >
                          Lunch
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: windowWidth < 786 ? "4vh" : "5vh",
                            fontFamily: "Comme, sans-serif",
                          }}
                        >
                          Dinner
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {item.map((i, key) => (
                      <TableBody>
                        {handleDay(key)}
                        <TableCell
                          sx={{
                            color: "white",
                            fontSize: windowWidth < 786 ? "3vh" : "3.5vh",
                            fontFamily: "Comme, sans-serif",
                          }}
                        >
                          {i.BreakFast}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontSize: windowWidth < 786 ? "3vh" : "3.5vh",
                            fontFamily: "Comme, sans-serif",
                          }}
                        >
                          {i.Lunch}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontSize: windowWidth < 786 ? "3vh" : "3.5vh",
                            fontFamily: "Comme, sans-serif",
                          }}
                        >
                          {i.Dinner}
                        </TableCell>
                      </TableBody>
                    ))}
                  </Table>
                </Box>
              </>
            ))}
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
                  setindx(index1);
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
          </>
        ))
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
            You have not bought any Diet Plan!
          </Typography>
          <Typography
            fontSize={"3vw"}
            color={"white"}
            textAlign={"center"}
            fontFamily={"Comme, sans-serif"}
          >
            visit
            <NavLink
              to={"/diet-plans"}
              style={{
                borderBottom: "1px solid white",
                marginLeft: "3px",
                marginRight: "3px",
              }}
            >
              Get Diet Plan
            </NavLink>
            to get user-centeric diet plan created by a professional
          </Typography>
        </Container>
      )}
    </Container>
  );
};

export default ViewDietPlanPage;
