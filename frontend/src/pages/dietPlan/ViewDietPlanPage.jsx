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
  const [ResponseFromDB, setResponseFromDB] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [planExist, setplanExist] = useState(false);
  const IDofCurrentUser = useSelector(
    (state) => state.CurrentUser.CurrentUserID
  );
  const FetchDietPlan = async () => {
    await axios.get("diet/all-diet-plans/" + IDofCurrentUser).then((res) => {
      setDietPlan(res.data.data.DietPlan);
      setResponseFromDB(res.data.data);
    });
  };
  useEffect(()=>FetchDietPlan, []);
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
              fontSize: "5vh",
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
              fontSize: "5vh",
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
              fontSize: "5vh",
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
              fontSize: "5vh",
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
              fontSize: "5vh",
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
              fontSize: "5vh",
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
        Your Diet Plan!
      </Typography>
      {modalOpen && (
        <DietPlanUpdateRequestModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          Plan={ResponseFromDB}
        />
      )}
      {planExist ? (
        <>
          {DietPlan.map((item, index) => (
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

              <Table sx={{ mb: 5 }}>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "5vh",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      Breakfast
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "5vh",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      Lunch
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "5vh",
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
                        fontSize: "3.5vh",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      {i.BreakFast}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: "3.5vh",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      {i.Lunch}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: "3.5vh",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      {i.Dinner}
                    </TableCell>
                  </TableBody>
                ))}
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

export default ViewDietPlanPage;
