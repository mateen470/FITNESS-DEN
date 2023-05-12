import React, { useEffect, useState } from "react";
import axios from "axios";
import DietPlanUpdateRequestModal from "../../components/update-req-modal/DietPlanUpdateRequestModal";
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
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { NavLink } from "react-router-dom";

const ViewDietPlanPage = () => {
  const [DietPlan, setDietPlan] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState([]);
  const FetchDietPlan = () => {
    axios.get("diet/all-diet-plans").then((res) => setDietPlan(res.data.data));
  };

  useEffect(FetchDietPlan, []);
  const handleDay = (index) => {
    switch (index) {
      case 0:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.6rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Monday
          </td>
        );
      case 1:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.6rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Tuesday
          </td>
        );
      case 2:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.6rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Wednesday
          </td>
        );
      case 3:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.6rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Thursday
          </td>
        );
      case 4:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.6rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Friday
          </td>
        );
      case 5:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.6rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Saturday
          </td>
        );
      case 6:
        return (
          <td
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.6rem",
              fontFamily: "Comme, sans-serif",
            }}
          >
            Sunday
          </td>
        );
      default:
        return <td></td>;
    }
  };
  return (
    <Container>
      {modalOpen && (
        <DietPlanUpdateRequestModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          Plan={DietPlan[index]}
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
        Your Diet Plan!
      </Typography>
      {DietPlan.map((item, idx) => (
        <>
          {item.DietPlan.map((i, key) => (
            <>
              <Typography
                color={"white"}
                fontSize={"6vh"}
                fontFamily={"Comme, sans-serif"}
                fontWeight={800}
                key={key}
                textAlign={"center"}
              >
                Week {key + 1}
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.6rem",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      Breakfast
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.6rem",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      Lunch
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.6rem",
                        fontFamily: "Comme, sans-serif",
                      }}
                    >
                      Dinner
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {i.map((x, j) => (
                    <TableRow>
                      {handleDay(j)}

                      <TableCell
                        sx={{
                          color: "white",
                          fontSize: "1.5rem",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        {x.BreakFast}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontSize: "1.5rem",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        {x.Lunch}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontSize: "1.5rem",
                          fontFamily: "Comme, sans-serif",
                        }}
                      >
                        {x.Dinner}
                      </TableCell>
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
                    setIndex(idx);
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
        </>
      ))}
    </Container>
  );
};

export default ViewDietPlanPage;
